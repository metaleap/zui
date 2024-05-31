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

const (
	errMsgMultipleTopLevelScriptElems = "A component can only have one top-level <script> element"
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
	// find the <head> and <body> first, either may have the top-level <script>
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

	// deal with the <body>
	buf_js.WriteString(newline + "  zuiCreateHTMLElements(shadowRoot) {")
	if htm_body != nil { // also look for the top-level <script> in the <body>, which happens if it's placed after other markup but still top-level
		htm_script, err = htmlTopLevelScriptElement(zuiFilePath, htm_body, htm_script)
		if err != nil {
			return "", err
		}
		// walk the <body> to generate JS DOM construction code
		walkBodyAndEmitJS(&buf_js, 0, htm_body, "shadowRoot", zuiFileHash)
	}
	buf_js.WriteString(newline + "  }")

	// deal with the <script>
	if htm_script != nil && htm_script.FirstChild != nil &&
		htm_script.FirstChild == htm_script.LastChild && htm_script.FirstChild.Type == html.TextNode {
		buf_js.WriteString(newline + newline) // extra new lines because these emits are unindented
		if err := walkScriptAndEmitJS(zuiFilePath, &buf_js, htm_script.FirstChild.Data); err != nil {
			return "", err
		}
		buf_js.WriteString(newline + newline)
	}

	// register the HTML Custom Element
	buf_js.WriteString(newline + "}" + newline)
	buf_js.WriteString(newline + "customElements.define('zui-" + strings.ToLower(zui_class_name) + "_" + zuiFileHash + "', " + zui_class_name + ");")

	return buf_js.String() + newline, err
}

func walkBodyAndEmitJS(buf *strings.Builder, level int, parentNode *html.Node, parentNodeVarName string, zuiFileHash string) {
	if pref := "\n    "; parentNode.Type == html.ElementNode && parentNode.FirstChild != nil {
		for child_node, i := parentNode.FirstChild, 0; child_node != nil; child_node, i = child_node.NextSibling, i+1 {
			switch child_node.Type {
			case html.TextNode:
				buf.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(child_node.Data) + ");")
			case html.ElementNode:
				node_var_name := "node_" + ıf(child_node.Type == html.ElementNode, child_node.Data+"_", "") + strconv.Itoa(level) + "_" + strconv.Itoa(i) + "_" + zuiFileHash
				buf.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(child_node.Data) + ");")
				walkBodyAndEmitJS(buf, level+1, child_node, node_var_name, zuiFileHash)
				buf.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}
}

func walkScriptAndEmitJS(zuiFilePath string, buf *strings.Builder, scriptNodeText string) error {
	js_ast, err := js.Parse(parse.NewInputString(scriptNodeText), js.Options{})
	if err != nil {
		return errors.New(zuiFilePath + ": " + err.Error())
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
	for _, stmt := range js_ast.List { // not walking the map to preserve original ordering
		switch it := stmt.(type) {
		case *js.FuncDecl:
			// name := it.Name.String()
			walkAndRewriteTopLevelFuncAST(&it.Params, &it.Body, top_level_decls)
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
						walkAndRewriteTopLevelFuncAST(&it.Params, &it.Body, top_level_decls)
						item.Default = it
					case *js.ArrowFunc:
						walkAndRewriteTopLevelFuncAST(&it.Params, &it.Body, top_level_decls)
						item.Default = it
					}
					buf.WriteString(" = " + jsString(item.Default))
				}
				buf.WriteByte(';')
			}
		}
	}
	return nil
}

func walkAndRewriteTopLevelFuncAST(fnParams *js.Params, fnBody *js.BlockStmt, allTopLevelDecls map[string]js.IExpr) {

}
