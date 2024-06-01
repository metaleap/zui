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
	usedSubsMap   bool
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

	// initial basic mostly-static JS emits
	zui_file_name := filepath.Base(zuiFilePath)
	newline, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	me.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))
	me.WriteString(newline + "export class " + zui_class_name + " extends HTMLElement {")

	me.WriteString(newline + "  constructor() {")
	me.WriteString(newline + "    super();")
	me.WriteString(newline + "  }")

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
	me.usedSubsMap = false
	if htm_body != nil {
		if err = me.walkBodyAndEmitJS(0, htm_body, "shadowRoot"); err != nil {
			return "", err
		}
	}
	me.WriteString(newline + "  }")
	if me.usedSubsMap {
		me.WriteString(newline + newline + "  subs_" + me.zuiFileIdent + " = new Map();")
	}

	// register the HTML Custom Element
	me.WriteString(newline + newline + "  static ZuiTagName = " + strconv.Quote("zui-"+strings.ToLower(zui_class_name)+"_"+zuiFileHash) + ";")
	me.WriteString(newline + "}")
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
			assert(len(it.Default) != 0 && len(it.Module) != 0 && len(it.List) == 0)
			me.allImports[string(it.Default)] = string(it.Module) // Default: "Nested", Module: "./Nested.zui" List: []

			// default:
			// 	println(">>" + fmt.Sprintf("%T", it) + "<<")
		}
	}

	// now, emit the top-level decls, rewriting all func ASTs
	for _, stmt := range js_ast.List { // not walking our map, so as to preserve original ordering
		switch it := stmt.(type) {
		case *js.FuncDecl:
			name := it.Name.String()
			if err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
				return err
			}
			src_fn := jsString(it)
			assert(strings.HasPrefix(src_fn, "function "))
			me.WriteString("\n" + src_fn[len("function "):])
		case *js.VarDecl:
			for _, item := range it.List {
				name := jsString(item.Binding)
				me.WriteString("\n" + name)
				if item.Default != nil {
					switch it := item.Default.(type) {
					case *js.FuncDecl:
						if err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
							return err
						}
						item.Default = it
					case *js.ArrowFunc:
						if err = jsWalkAndRewriteTopLevelFuncAST(me, name, &it.Body); err != nil {
							return err
						}
						item.Default = it
					}
					me.WriteString(" = " + jsString(item.Default))
				}
				me.WriteByte(';')
			}
		}
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
					switch part := part.(type) {
					case string:
						me.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(part) + ");")
					case js.INode:
						js_src := strings.TrimSuffix(jsString(part), ";")
						span_var_name := "txt_" + shortenedLen6(ContentHashStr([]byte(js_src)))
						me.WriteString(pref + "tmp_fn = (function() { return '' + " + js_src + "; }).bind(this);")
						me.WriteString(pref + "const " + span_var_name + " = document.createTextNode(tmp_fn());")
						me.WriteString(pref + "this.subs_" + me.zuiFileIdent + ".set(" + span_var_name + ", tmp_fn);")
						me.usedSubsMap = true
						me.WriteString(pref + parentNodeVarName + ".append(" + span_var_name + ");")
					default:
						panic(part)
					}
				}
			case html.ElementNode:
				if child_node.Data == ("zui_" + me.zuiFileIdent) {

					// continue
				}

				node_var_name := "node_" + replDashToUnderscore.Replace(child_node.Data) + "_" + strconv.Itoa(level) + "_" + strconv.Itoa(i) + "_" + me.zuiFileIdent
				me.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(child_node.Data) + ");")
				for _, attr := range child_node.Attr {
					parts, err := me.htmlSplitTextAndJSExprs(attr.Val)
					if err != nil {
						return err
					}

					me.WriteString(pref + node_var_name + ".setAttribute(" + strconv.Quote(attr.Key) + ", ''")
					for _, part := range parts {
						me.WriteByte('+')
						switch part := part.(type) {
						case string:
							me.WriteString(strconv.Quote(part))
						case js.INode:
							js_src := strings.TrimSuffix(jsString(part), ";")
							me.WriteString(js_src)
						}
					}
					me.WriteString(");")
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
