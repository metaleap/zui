package zui

import (
	"errors"
	"path/filepath"
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

	topLevelDecls         map[string]js.IExpr
	topLevelReactiveDecls map[*js.LabelledStmt]js.IExpr
	topLevelReactiveDeps  map[string][]string
	topLevelReactiveStmts map[string][]string
	imports               map[string]string
	attrExports           []string
	usedSubs              bool
	idxFn                 int
	idxEl                 int
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	me := zui2js{
		zuiFilePath:           zuiFilePath,
		zuiFileHash:           zuiFileHash,
		zuiFileIdent:          shortenedLen6(zuiFileHash),
		zuiFileSrcOrig:        zuiFileSrc,
		topLevelDecls:         map[string]js.IExpr{},
		topLevelReactiveDecls: map[*js.LabelledStmt]js.IExpr{},
		topLevelReactiveDeps:  map[string][]string{},
		topLevelReactiveStmts: map[string][]string{},
		imports:               map[string]string{},
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
	if false {
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
	if htm_body != nil {
		if err = me.walkBodyAndEmitJS(0, htm_body, "shadowRoot"); err != nil {
			return "", err
		}
	}
	me.WriteString(newline + "  }")

	if len(me.attrExports) > 0 {
		me.WriteString(newline + "  static observedAttributes = ['" + strings.Join(me.attrExports, "', '") + "'];")
		me.WriteString(newline + "  attributeChangedCallback(name, vOld, vNew) {")
		me.WriteString(newline + "    this[name] = vNew;")
		me.WriteString(newline + "  }")
	}

	me.WriteString(newline + "  constructor() {")
	me.WriteString(newline + "    super();")
	for _, name := range orderedMapKeys(me.topLevelReactiveDeps) {
		for _, dep := range me.topLevelReactiveDeps[name] {
			me.WriteString(newline + "    this.zuiSub('" + dep + "', () => this.zuiOnPropChanged('" + name + "'));")
		}
	}
	for _, src_js := range orderedMapKeys(me.topLevelReactiveStmts) {
		for _, dep := range me.topLevelReactiveStmts[src_js] {
			me.WriteString(newline + "    this.zuiSub('" + dep + "', () => {\n" + src_js + "\n    });")
		}
	}
	me.WriteString(newline + "  }")

	if !me.usedSubs {
		me.WriteString(newline + "  zuiOnPropChanged(name) {}")
	} else {
		me.WriteString(`
#subs = new Map();
zuiSub(name, ...fn) {
  let arr = this.#subs.get(name);
  if (!arr)
    arr = fn;
  else
    arr.push(...fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.#subs) {
    const subs = this.#subs.get(name);
    if (subs) {
      for (const fn of subs)
        fn();
    }
  }
}
`)
	}

	// register the HTML Custom Element
	me.WriteString(newline + newline + "  static ZuiTagName = " + strQ("zui-"+strLo(zui_class_name)+"_"+zuiFileHash) + ";")
	me.WriteString(newline + "}")
	for _, zui_import_name := range orderedMapKeys(me.imports) {
		zui_import_path := me.imports[zui_import_name]
		zui_import_path = FsPathSwapExt(zui_import_path, ".zui", ".js")
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
		if export, _ := stmt.(*js.ExportStmt); export != nil {
			if decl, _ := export.Decl.(*js.VarDecl); decl != nil {
				stmt = decl
			} else if decl, _ := export.Decl.(*js.FuncDecl); decl != nil {
				stmt = decl
			}
		}

		switch stmt := stmt.(type) {
		case *js.VarDecl:
			for _, item := range stmt.List {
				assert(item.Binding != nil)
				name := jsString(item.Binding)
				assert(name != "")
				me.topLevelDecls[name] = item.Default
			}
		case *js.FuncDecl:
			assert(stmt.Name != nil)
			name := stmt.Name.String()
			assert(name != "")
			me.topLevelDecls[name] = stmt
		case *js.ImportStmt:
			name, path := strings.Trim(string(stmt.Default), "\"'"), strings.Trim(string(stmt.Module), "\"'")
			assert(name != "" && path != "" && len(stmt.List) == 0)
			me.imports[name] = path
		case *js.LabelledStmt:
			expr, _ := stmt.Value.(*js.ExprStmt)
			var assignment *js.BinaryExpr
			if expr != nil {
				assignment, _ = expr.Value.(*js.BinaryExpr)
			}
			var assignee *js.Var
			if assignment != nil && assignment.Op == js.EqToken {
				assignee, _ = assignment.X.(*js.Var)
			}
			if assignee != nil {
				name := string(assignee.Name())
				assert(name != "")
				me.topLevelReactiveDecls[stmt] = assignment.Y
			}

		default:
			return errors.New(me.zuiFilePath + ": unexpected at top-level: '" + jsString(stmt))
		}
	}

	pref := "\n  "
	// now, emit the top-level decls, rewriting all func ASTs
	for i, stmt := range js_ast.List { // not walking our map, so as to preserve original ordering
		is_exported := false
		if export, _ := stmt.(*js.ExportStmt); export != nil {
			if decl, _ := export.Decl.(*js.VarDecl); decl != nil {
				stmt, is_exported = decl, true
			} else if decl, _ := export.Decl.(*js.FuncDecl); decl != nil {
				stmt, is_exported = decl, true
			}
		}

		switch stmt := stmt.(type) {
		case *js.FuncDecl:
			name_orig := stmt.Name.String()
			if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name_orig, &stmt.Body); err != nil {
				return err
			}
			src_fn := jsString(stmt)
			assert(strings.HasPrefix(src_fn, "function "))
			me.WriteString("\n\n" + ıf(is_exported, "", "#") + strings.TrimSpace(src_fn[len("function "):]) + "\n")
		case *js.VarDecl:
			for _, item := range stmt.List {
				name_orig := jsString(item.Binding)
				name_prop := ıf(is_exported, name_orig, "#"+name_orig)
				name_var := "#v" + itoa(i)
				if is_exported {
					me.attrExports = append(me.attrExports, name_orig)
				}
				{
					me.WriteString(pref + name_var)
					if item.Default != nil {
						switch it := item.Default.(type) {
						case *js.FuncDecl:
							if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name_orig, &it.Body); err != nil {
								return err
							}
							item.Default = it
						case *js.ArrowFunc:
							if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name_orig, &it.Body); err != nil {
								return err
							}
							item.Default = it
						}
						me.WriteString(" = " + jsString(item.Default))
					}
					me.WriteByte(';')
				}
				me.WriteString(pref + "get " + name_prop + "() { return this." + name_var + "; }")
				me.WriteString(pref + "set " + name_prop + "(v) {")
				me.WriteString(pref + "  if (((typeof this." + name_var + ") === 'object') || ((typeof v) === 'object') || !Object.is(this." + name_var + ", v)) {")
				me.WriteString(pref + "    this." + name_var + " = v;")
				me.WriteString(pref + "    this.zuiOnPropChanged('" + name_orig + "');")
				me.WriteString(pref + "  }")
				me.WriteString(pref + "}")
			}
		case *js.LabelledStmt:
			if expr := me.topLevelReactiveDecls[stmt]; expr != nil {
				name := jsAssigneeNameInLabelledStmt(stmt)
				me.topLevelReactiveDeps[name], err = jsWalkAndRewriteTopLevelFuncAST(me, name, &js.BlockStmt{List: []js.IStmt{&js.ExprStmt{Value: expr}}})
				if err != nil {
					return err
				}
				me.WriteString(pref + "get #" + name + "() { return " + jsString(expr) + " }")
			} else {
				block := js.BlockStmt{List: []js.IStmt{stmt.Value}}
				deps, err := jsWalkAndRewriteTopLevelFuncAST(me, "", &block)
				if err != nil {
					return err
				}
				me.topLevelReactiveStmts[jsString(block.List[0])] = deps
			}
		}
	}
	return nil
}

func (me *zui2js) walkBodyAndEmitJS(level int, parentNode *html.Node, parentNodeVarName string) error {
	next_fn := func() string { me.idxFn++; return "fn" + itoa(me.idxFn) }
	next_el := func() string { me.idxEl++; return "el" + itoa(me.idxEl) }
	if pref := "\n    "; parentNode.Type == html.ElementNode && parentNode.FirstChild != nil {
		for child_node, i := parentNode.FirstChild, 0; child_node != nil; child_node, i = child_node.NextSibling, i+1 {
			switch child_node.Type {
			case html.TextNode:
				if parentNode.Type == html.ElementNode && parentNode.Data == "style" {
					me.WriteString(pref + parentNodeVarName + ".append(" + strQ(child_node.Data) + ");")
					continue
				}

				parts, err := me.htmlSplitTextAndJSExprs(child_node.Data)
				if err != nil {
					return err
				}
				for _, part := range parts {
					if part.text != "" {
						me.WriteString(pref + parentNodeVarName + ".append(" + strQ(part.text) + ");")
					} else if part.expr != nil {
						js_src := strings.TrimSuffix(jsString(part.expr), ";")
						fn_name, span_var_name := next_fn(), next_el()
						me.WriteString(pref + "const " + fn_name + " = (function() { return " + js_src + "; }).bind(this);")
						if part.exprAsHtml {
							me.WriteString(pref + "const " + span_var_name + " = document.createElement('span');")
							me.WriteString(pref + span_var_name + ".innerHTML = " + fn_name + "();")
						} else {
							me.WriteString(pref + "const " + span_var_name + " = document.createTextNode(" + fn_name + "());")
						}
						for _, top_level_decl_name := range part.exprTopLevelRefs {
							me.WriteString(pref + "this.zuiSub('" + top_level_decl_name + "', (() => { " + span_var_name + "." + ıf(part.exprAsHtml, "innerHTML", "nodeValue") + " = " + fn_name + "(); }).bind(this));")
							me.usedSubs = true
						}
						me.WriteString(pref + parentNodeVarName + ".append(" + span_var_name + ");")
					}
				}
			case html.ElementNode:
				node_var_name := next_el()
				is_zui_tag := child_node.Data == ("zui_" + me.zuiFileIdent)

				if is_zui_tag {
					zui_tag_name := htmlAttr(child_node, "zui-tag-name")
					assert(zui_tag_name != "")
					zui_rel_file_path := me.imports[zui_tag_name]
					if zui_rel_file_path == "" {
						return errors.New(me.zuiFilePath + ": component '" + zui_tag_name + "' was not `import`ed")
					}
					me.WriteString(pref + "const " + node_var_name + " = document.createElement(" + zui_tag_name + ".ZuiTagName);")
				} else {
					me.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strQ(child_node.Data) + ");")
				}

				for _, attr := range child_node.Attr {
					if strings.HasPrefix(attr.Key, "zui-") {
						continue
					}

					if attr.Val == "" && strings.HasPrefix(attr.Key, "{") && strings.HasSuffix(attr.Key, "}") {
						attr.Val = attr.Key
						attr.Key = strings.TrimSpace(attr.Key[:len(attr.Key)-1][1:])
					}

					parts, err := me.htmlSplitTextAndJSExprs(attr.Val)
					if err != nil {
						return err
					}

					fn_name, attr_val_js_expr, attr_val_js_funcs := "", "", ""
					for _, part := range parts {
						if part.expr != nil {
							attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
							if part.exprAsHtml {
								return errors.New(me.zuiFilePath + ": the '@html' special tag is not permitted in any attributes, including '" + attr.Key + "'")
							}
							js_src := strings.TrimSuffix(jsString(part.expr), ";")
							fn_name = next_fn()
							attr_val_js_funcs += (pref + "const " + fn_name + " = (function() { return " + js_src + "; }).bind(this);")
							attr_val_js_expr += " (" + fn_name + "()) "
						} else if part.text != "" {
							attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
							attr_val_js_expr += strQ(part.text)
						}
					}
					me.WriteString(attr_val_js_funcs)
					switch {
					default:
						fn_name_attr := next_fn()
						me.WriteString(pref + "const " + fn_name_attr + " = () => " + attr_val_js_expr + ";")
						me.WriteString(pref + node_var_name + ".setAttribute(" + strQ(attr.Key) + ",  " + fn_name_attr + "());")
						attr_decl_sub_done := map[string]bool{}
						for _, part := range parts {
							for _, top_level_decl_name := range part.exprTopLevelRefs {
								if attr_decl_sub_done[top_level_decl_name] {
									continue
								}
								me.WriteString(pref + "this.zuiSub('" + top_level_decl_name + "', () => " + node_var_name + ".setAttribute(" + strQ(attr.Key) + ",  " + fn_name_attr + "()));")
								me.usedSubs, attr_decl_sub_done[top_level_decl_name] = true, true
							}
						}
					case strings.HasPrefix(attr.Key, "on:"):
						if len(parts) != 1 || parts[0].expr == nil {
							return errors.New(me.zuiFilePath + ": invalid attribute value in " + attr.Key + "='" + attr.Val + "'")
						}
						evt_name := strings.TrimSpace(attr.Key[len("on:"):])
						me.WriteString(pref + node_var_name + ".addEventListener('" + evt_name + "', ((evt) => " + fn_name + "().bind(this)()).bind(this));")
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
