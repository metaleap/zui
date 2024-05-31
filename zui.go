package zui

import (
	"errors"
	"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/net/html"

	"github.com/tdewolff/parse/v2"
	"github.com/tdewolff/parse/v2/js"
)

func FirstLineJS(zuiFilePath string, zuiFileHash string) string {
	return "// Code generated from " + filepath.Base(zuiFilePath) + ". DO NOT EDIT\n// Source file content hash: " + zuiFileHash + "\n"
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	var buf_js strings.Builder // our result JS src we're building

	htm_root, err := html.Parse(strings.NewReader(strings.TrimSpace(zuiFileSrc)))
	if err != nil {
		return "", err
	}

	// initial basic mostly-static JS emits
	zui_file_name := filepath.Base(zuiFilePath)
	newline, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	buf_js.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))
	buf_js.WriteString(newline + "export class " + zui_class_name + " extends HTMLElement {")

	buf_js.WriteString(newline + "  constructor() {")
	buf_js.WriteString(newline + "    super();")
	buf_js.WriteString(newline + "  }")

	buf_js.WriteString(newline + "  connectedCallback() {")
	buf_js.WriteString(newline + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	buf_js.WriteString(newline + "    this.zuiCreateHTMLElements(shadowRoot);")
	buf_js.WriteString(newline + "  }")

	buf_js.WriteString(newline + "  disconnectedCallback() {")
	buf_js.WriteString(newline + "  }")
	buf_js.WriteString(newline + "  adoptedCallback() {")
	buf_js.WriteString(newline + "  }")
	buf_js.WriteString(newline + "  attributeChangedCallback() {")
	buf_js.WriteString(newline + "  }")

	var htm_head, htm_body, htm_script *html.Node
	for htm_root.FirstChild.Type == html.CommentNode {
		htm_root.FirstChild = htm_root.FirstChild.NextSibling
	}
	// find the <head> and <body> first
	for node := htm_root.FirstChild.FirstChild; node != nil; node = node.NextSibling {
		if node.Type == html.ElementNode && node.Data == "head" {
			htm_head = node
		}
		if node.Type == html.ElementNode && node.Data == "body" {
			htm_body = node
		}
	}
	// now look for the <script> in the <head>
	if htm_head != nil {
		htm_script, err = htmlTopLevelScriptElement(zuiFilePath, htm_head, htm_script)
		if err != nil {
			return "", err
		}
	}
	// also look for the top-level <script> in the <body> (found there instead of <head> if it's placed after other markup but still top-level)
	if htm_body != nil {
		htm_script, err = htmlTopLevelScriptElement(zuiFilePath, htm_body, htm_script)
		if err != nil {
			return "", err
		}
	}

	// deal with the <script>
	top_level_decls := map[string]js.IExpr{}
	if htm_script != nil && htm_script.FirstChild != nil &&
		htm_script.FirstChild == htm_script.LastChild && htm_script.FirstChild.Type == html.TextNode {
		buf_js.WriteString(newline + newline) // extra new lines because these emits are unindented
		if top_level_decls, err = walkScriptAndEmitJS(zuiFilePath, &buf_js, htm_script.FirstChild.Data); err != nil {
			return "", err
		}
		buf_js.WriteString(newline + newline)
	}

	buf_js.WriteString(newline + "  subs_" + zuiFileHash + " = new Map();")
	buf_js.WriteString(newline + "  zuiCreateHTMLElements(shadowRoot) {")
	buf_js.WriteString(newline + "    let tmp_fn;")
	if htm_body != nil {
		if err = walkBodyAndEmitJS(zuiFilePath, &buf_js, 0, htm_body, "shadowRoot", zuiFileHash, top_level_decls); err != nil {
			return "", err
		}
	}
	buf_js.WriteString(newline + "  }")

	// register the HTML Custom Element
	buf_js.WriteString(newline + "}" + newline)
	buf_js.WriteString(newline + "customElements.define('zui-" + strings.ToLower(zui_class_name) + "_" + zuiFileHash + "', " + zui_class_name + ");")

	return buf_js.String() + newline, err
}

func walkScriptAndEmitJS(zuiFilePath string, buf *strings.Builder, scriptNodeText string) (map[string]js.IExpr, error) {
	js_ast, err := js.Parse(parse.NewInputString(scriptNodeText), js.Options{})
	if err != nil {
		return nil, errors.New(zuiFilePath + ": " + err.Error())
	}

	// capture all top-level decl names first before any emits, because func AST rewrites need them
	top_level_decls := map[string]js.IExpr{}
	for _, stmt := range js_ast.List {
		switch it := stmt.(type) {
		case *js.VarDecl:
			for _, item := range it.List {
				assert(item.Binding != nil)
				name := jsString(item.Binding)
				assert(name != "")
				top_level_decls[name] = item.Default
			}
		case *js.FuncDecl:
			assert(it.Name != nil)
			name := it.Name.String()
			assert(name != "")
			top_level_decls[name] = it
		}
	}

	// now, emit the top-level decls, rewriting all func ASTs
	for _, stmt := range js_ast.List { // not walking our map, so as to preserve original ordering
		switch it := stmt.(type) {
		case *js.FuncDecl:
			name := it.Name.String()
			if err = walkAndRewriteTopLevelFuncAST(zuiFilePath, name, &it.Body, top_level_decls); err != nil {
				return nil, err
			}
			src_fn := jsString(it)
			assert(strings.HasPrefix(src_fn, "function "))
			buf.WriteString("\n" + src_fn[len("function "):])
		case *js.VarDecl:
			for _, item := range it.List {
				name := jsString(item.Binding)
				buf.WriteString("\n" + name)
				if item.Default != nil {
					switch it := item.Default.(type) {
					case *js.FuncDecl:
						if err = walkAndRewriteTopLevelFuncAST(zuiFilePath, name, &it.Body, top_level_decls); err != nil {
							return nil, err
						}
						item.Default = it
					case *js.ArrowFunc:
						if err = walkAndRewriteTopLevelFuncAST(zuiFilePath, name, &it.Body, top_level_decls); err != nil {
							return nil, err
						}
						item.Default = it
					}
					buf.WriteString(" = " + jsString(item.Default))
				}
				buf.WriteByte(';')
			}
		}
	}
	return top_level_decls, nil
}

func walkBodyAndEmitJS(zuiFilePath string, buf *strings.Builder, level int, parentNode *html.Node, parentNodeVarName string, zuiFileHash string, allTopLevelDecls map[string]js.IExpr) error {
	if pref := "\n    "; parentNode.Type == html.ElementNode && parentNode.FirstChild != nil {
		for child_node, i := parentNode.FirstChild, 0; child_node != nil; child_node, i = child_node.NextSibling, i+1 {
			switch child_node.Type {
			case html.TextNode:
				parts, err := htmlSplitTextAndJSExprs(zuiFilePath, child_node.Data, allTopLevelDecls)
				if err != nil {
					return err
				}
				for _, part := range parts {
					switch part := part.(type) {
					case string:
						buf.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(part) + ");")
					case js.INode:
						js_src := jsString(part)
						span_var_name := "span_" + ContentHashStr([]byte(js_src))
						buf.WriteString(pref + "const " + span_var_name + " = document.createElement('span');")
						buf.WriteString(pref + "tmp_fn = function(this) { return " + js_src + " };")
						buf.WriteString(pref + "this.subs_" + zuiFileHash + ".set(" + span_var_name + ", tmp_fn);")
						buf.WriteString(pref + span_var_name + ".append(tmp_fn(this));")
					default:
						panic(part)
					}
				}
			case html.ElementNode:
				node_var_name := "node_" + ıf(child_node.Type == html.ElementNode, child_node.Data+"_", "") + strconv.Itoa(level) + "_" + strconv.Itoa(i) + "_" + zuiFileHash
				buf.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(child_node.Data) + ");")
				for _, attr := range child_node.Attr {
					buf.WriteString(pref + node_var_name + ".setAttribute(" + strconv.Quote(attr.Key) + ", " + strconv.Quote(attr.Val) + ");")
				}
				if err := walkBodyAndEmitJS(zuiFilePath, buf, level+1, child_node, node_var_name, zuiFileHash, allTopLevelDecls); err != nil {
					return err
				}
				buf.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}
	return nil
}
