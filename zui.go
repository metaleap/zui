package zui

import (
	"errors"
	"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"

	"github.com/tdewolff/parse/v2"
	"github.com/tdewolff/parse/v2/js"
)

func FirstLineJS(zuiFilePath string, zuiFileHash string) string {
	return "// Code generated from " + filepath.Base(zuiFilePath) + ". DO NOT EDIT\n// Source file content hash: " + zuiFileHash + "\n"
}

type zui2js struct {
	strings.Builder // our result JS src that we're building

	// init stuff

	zuiFilePath    string
	zuiFileHash    string
	zuiFileIdent   string
	zuiFileSrcOrig string

	// in-flight state

	topLevelDecls map[string]js.IExpr
	allImports    map[string]string
	usedSubs      bool
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	me := zui2js{
		zuiFilePath:    zuiFilePath,
		zuiFileHash:    zuiFileHash,
		zuiFileIdent:   shortenedLen6(zuiFileHash),
		zuiFileSrcOrig: zuiFileSrc,
		topLevelDecls:  map[string]js.IExpr{},
		allImports:     map[string]string{},
	}

	src_htm, err := me.htmlFixupSelfClosingZuiTagsPriorToParsing()
	if err != nil {
		return "", err
	}
	htm_top_nodes, err := html.ParseFragment(
		strings.NewReader(strings.TrimSpace(src_htm)),
		&html.Node{
			Type:     html.ElementNode,
			Data:     "html",
			DataAtom: atom.Html,
			Parent: &html.Node{
				Type: html.DoctypeNode,
				Data: "html",
			},
		},
	)
	if err != nil {
		return "", err
	}
	if true {
		for i, htm := range htm_top_nodes {
			println(i, htmlSrc(htm))
		}
	}

	var htm_head, htm_body, htm_script *html.Node
	// find the <head> and <body> first
	for _, node := range htm_top_nodes {
		if node.Type == html.ElementNode && node.Data == "head" {
			htm_head = node
		}
		if node.Type == html.ElementNode && node.Data == "body" {
			htm_body = node
		}
	}
	// now look for the <script> in the <head>
	if htm_head != nil {
		htm_script, err = me.htmlTopLevelScriptElement(htm_head, htm_script)
		if err != nil {
			return "", err
		}
	}
	// also look for the top-level <script> in the <body> (found there instead of <head> if it's placed after other markup but still top-level)
	if htm_body != nil {
		htm_script, err = me.htmlTopLevelScriptElement(htm_body, htm_script)
		if err != nil {
			return "", err
		}
	}

	// initial basic mostly-static JS emits
	zui_file_name := filepath.Base(zuiFilePath)
	newline, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	me.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))
	me.WriteString(newline + "export class " + zui_class_name + " extends HTMLElement {")

	me.WriteString(newline + "  connectedCallback() {")
	me.WriteString(newline + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	me.WriteString(newline + "    this.zuiCreateHTMLElements(shadowRoot);")
	me.WriteString(newline + "  }")

	// me.WriteString(newline + "  disconnectedCallback() {")
	// me.WriteString(newline + "  }")
	// me.WriteString(newline + "  adoptedCallback() {")
	// me.WriteString(newline + "  }")
	// me.WriteString(newline + "  attributeChangedCallback() {")
	// me.WriteString(newline + "  }")

	// deal with the <script>
	if htm_script != nil && htm_script.FirstChild != nil &&
		htm_script.FirstChild == htm_script.LastChild && htm_script.FirstChild.Type == html.TextNode {
		me.WriteString(newline + newline) // extra new lines because these emits are unindented
		if err = me.walkScriptAndEmitJS(htm_script.FirstChild.Data); err != nil {
			return "", err
		}
		me.WriteString(newline + newline)
	}
	me.WriteString(newline + "  zuiCreateHTMLElements(shadowRoot) {")
	me.WriteString(newline + "    let tmp_fn;")
	if htm_body != nil {
		if err = me.walkBodyAndEmitJS(0, htm_body, "shadowRoot"); err != nil {
			return "", err
		}
	}
	me.WriteString(newline + "  }")
	me.WriteString(newline + "  constructor() {")
	me.WriteString(newline + "    super();")
	if me.usedSubs {
		me.WriteString(newline + "    this.#subs = new Map();")
	}
	me.WriteString(newline + "  }")

	// register the HTML Custom Element
	me.WriteString(newline + newline + "  static ZuiTagName = " + strconv.Quote("zui-"+strings.ToLower(zui_class_name)+"_"+zuiFileHash) + ";")
	me.WriteString(newline + "}")
	for _, zui_import_name := range orderedMapKeys(me.allImports) {
		zui_import_path := me.allImports[zui_import_name]
		zui_import_path = FsPathSwapExt(zui_import_path, ".zui", ".js")
		if !FsIsFile(filepath.Join(filepath.Dir(me.zuiFilePath), zui_import_path)) {
			return "", errors.New(me.zuiFilePath + ": imported '" + zui_import_name + "' from non-existing file '" + zui_import_path + "'")
		}
		me.WriteString(newline + "import { " + zui_import_name + " } from '" + zui_import_path + "'")
	}
	me.WriteString(newline + "customElements.define(" + zui_class_name + ".ZuiTagName, " + zui_class_name + ");")

	return me.String() + newline, err
}

func (me *zui2js) walkScriptAndEmitJS(scriptNodeText string) error {
	js_ast, err := js.Parse(parse.NewInputString(scriptNodeText), js.Options{})
	if err != nil {
		return errors.New(me.zuiFilePath + ": " + err.Error())
	}
	if err = jsWalkAndRewriteWholeAST(me, js_ast); err != nil {
		return err
	}

	// capture all top-level decl names first before any emits, because func AST rewrites need them
	for _, stmt := range js_ast.List {
		switch it := stmt.(type) {
		case *js.VarDecl:
			for _, item := range it.List {
				assert(item.Binding != nil)
				name := jsString(item.Binding)
				assert(name != "")
				me.topLevelDecls[name] = item.Default
			}
		case *js.FuncDecl:
			assert(it.Name != nil)
			name := it.Name.String()
			assert(name != "")
			me.topLevelDecls[name] = it
		case *js.ImportStmt:
			name, path := strings.Trim(string(it.Default), "\"'"), strings.Trim(string(it.Module), "\"'")
			assert(name != "" && path != "" && len(it.List) == 0)
			me.allImports[name] = path

			// default:
			// 	println(">>" + fmt.Sprintf("%T", it) + "<<")
		}
	}

	pref, got_setters := "\n  ", false
	// now, emit the top-level decls, rewriting all func ASTs
	for _, stmt := range js_ast.List { // not walking our map, so as to preserve original ordering
		switch it := stmt.(type) {
		case *js.FuncDecl:
			name := it.Name.String()
			if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
				return err
			}
			src_fn := jsString(it)
			assert(strings.HasPrefix(src_fn, "function "))
			me.WriteString("\n\n" + src_fn[len("function "):] + "\n")
		case *js.VarDecl:
			for _, item := range it.List {
				name := jsString(item.Binding)
				me.WriteString(pref + "#" + name)
				if item.Default != nil {
					switch it := item.Default.(type) {
					case *js.FuncDecl:
						if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
							return err
						}
						item.Default = it
					case *js.ArrowFunc:
						if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
							return err
						}
						item.Default = it
					}
					me.WriteString(" = " + jsString(item.Default))
				}
				me.WriteByte(';')
				me.WriteString(pref + "get " + name + "() { return this.#" + name + "; }")
				me.WriteString(pref + "set " + name + "(v) {")
				me.WriteString(pref + "  if (this.#" + name + " !== v) {")
				me.WriteString(pref + "    this.#" + name + " = v;")
				me.WriteString(pref + "    this.zuiOnPropChanged('" + name + "');")
				me.WriteString(pref + "  }")
				me.WriteString(pref + "}")
				got_setters = true
			}
		}
	}
	if got_setters {
		me.WriteString(`
#subs = null;
zuiSub(name, fn) {
  let arr = this.#subs.get(name);
  if (!(arr && arr.push))
    arr = [fn];
  else
    arr.push(fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.#subs) {
    const subs = this.#subs.get(name);
    if (subs && subs.length) {
      for (const fn of subs)
        fn.bind(this)();
    }
  }
}
`)
	}
	return nil
}

func (me *zui2js) walkBodyAndEmitJS(level int, parentNode *html.Node, parentNodeVarName string) error {
	if pref := "\n    "; parentNode.Type == html.ElementNode && parentNode.FirstChild != nil {
		for child_node, i := parentNode.FirstChild, 0; child_node != nil; child_node, i = child_node.NextSibling, i+1 {
			switch child_node.Type {
			case html.TextNode:
				if parentNode.Type == html.ElementNode && parentNode.Data == "style" {
					me.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(child_node.Data) + ");")
					continue
				}

				parts, err := me.htmlSplitTextAndJSExprs(child_node.Data)
				if err != nil {
					return err
				}
				for _, part := range parts {
					if part.text != "" {
						me.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(part.text) + ");")
					} else if part.expr != nil {
						js_src := strings.TrimSuffix(jsString(part.expr), ";")
						span_var_name := "txt_" + shortenedLen6(ContentHashStr([]byte(js_src)))
						me.WriteString(pref + "tmp_fn = (function() { return " + js_src + "; }).bind(this);")
						if part.exprAsHtml {
							me.WriteString(pref + "const " + span_var_name + " = document.createElement('span');")
							me.WriteString(pref + span_var_name + ".innerHTML = tmp_fn();")
						} else {
							me.WriteString(pref + "const " + span_var_name + " = document.createTextNode(tmp_fn());")
						}
						for _, top_level_decl_name := range part.exprTopLevelRefs {
							me.WriteString(pref + "this.zuiSub('" + top_level_decl_name + "', ((fn, el) => (() => { el." + ıf(part.exprAsHtml, "innerHTML", "nodeValue") + " = fn(); }).bind(this)).bind(this)(tmp_fn, " + span_var_name + "));")
							me.usedSubs = true
						}
						me.WriteString(pref + parentNodeVarName + ".append(" + span_var_name + ");")
					}
				}
			case html.ElementNode:
				node_var_name := "node_" + replDashToUnderscore.Replace(child_node.Data) + "_" + strconv.Itoa(level) + "_" + strconv.Itoa(i) + "_" + me.zuiFileIdent

				if child_node.Data == ("zui_" + me.zuiFileIdent) {
					zui_tag_name := htmlAttr(child_node, "zui-tag-name")
					assert(zui_tag_name != "")
					zui_rel_file_path := me.allImports[zui_tag_name]
					if zui_rel_file_path == "" {
						return errors.New(me.zuiFilePath + ": component '" + zui_tag_name + "' not imported")
					}
					me.WriteString(pref + "const " + node_var_name + " = document.createElement(" + zui_tag_name + ".ZuiTagName);")
					me.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
					continue
				}

				me.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(child_node.Data) + ");")
				for _, attr := range child_node.Attr {
					if attr.Val == "" && strings.HasPrefix(attr.Key, "{") && strings.HasSuffix(attr.Key, "}") {
						attr.Val = attr.Key
						attr.Key = strings.TrimSpace(attr.Key[:len(attr.Key)-1][1:])
					}

					parts, err := me.htmlSplitTextAndJSExprs(attr.Val)
					if err != nil {
						return err
					}

					attr_val_js_expr, attr_val_js_funcs := "", ""
					for _, part := range parts {
						if part.expr != nil {
							attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
							if part.exprAsHtml {
								return errors.New(me.zuiFilePath + ": the '@html' special tag is not permitted in any attributes, including '" + attr.Key + "'")
							}
							js_src := strings.TrimSuffix(jsString(part.expr), ";")
							attr_val_js_funcs += (pref + "tmp_fn = (function() { return " + js_src + "; }).bind(this);")
							attr_val_js_expr += " (tmp_fn()) "
						} else if part.text != "" {
							attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
							attr_val_js_expr += strconv.Quote(part.text)
						}
					}
					me.WriteString(attr_val_js_funcs)
					switch {
					default:
						me.WriteString(pref + node_var_name + ".setAttribute(" + strconv.Quote(attr.Key) + ",  " + attr_val_js_expr + ");")
					case strings.HasPrefix(attr.Key, "on:"):
						if len(parts) != 1 || parts[0].expr == nil {
							return errors.New(me.zuiFilePath + ": invalid attribute value in " + attr.Key + "='" + attr.Val + "'")
						}
						evt_name := strings.TrimSpace(attr.Key[len("on:"):])
						me.WriteString(pref + node_var_name + ".addEventListener('" + evt_name + "', ((fn) => ((evt) => fn().bind(this)(evt)).bind(this)).bind(this)(tmp_fn));")
					}
				}
				if err := me.walkBodyAndEmitJS(level+1, child_node, node_var_name); err != nil {
					return err
				}
				me.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}
	return nil
}
