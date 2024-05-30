package zui

import (
	"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/net/html"
)

func FirstLineJS(zuiFilePath string, zuiFileHash string) string {
	return "// Code generated from " + filepath.Base(zuiFilePath) + ". DO NOT EDIT\n// Source file content hash: " + zuiFileHash + "\n"
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	var buf strings.Builder
	buf.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))

	htm_root, err := html.Parse(strings.NewReader(strings.TrimSpace(zuiFileSrc)))
	if err != nil {
		return "", err
	}

	zui_file_name := filepath.Base(zuiFilePath)
	pref, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	buf.WriteString(pref + "export class " + zui_class_name + " extends HTMLElement {")

	buf.WriteString(pref + "  constructor() {")
	buf.WriteString(pref + "    super();")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  connectedCallback() {")
	buf.WriteString(pref + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	buf.WriteString(pref + "    this.zuiCreateHTMLElements(shadowRoot);")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  disconnectedCallback() {")
	buf.WriteString(pref + "  }")
	buf.WriteString(pref + "  adoptedCallback() {")
	buf.WriteString(pref + "  }")
	buf.WriteString(pref + "  attributeChangedCallback() {")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  zuiCreateHTMLElements(shadowRoot) {")
	htm_body := htm_root.FirstChild.FirstChild
	for htm_body != nil && htm_body.Data != "body" {
		htm_body = htm_body.NextSibling
	}
	if htm_body == nil || htm_body.Data != "body" {
		panic("breaking changes in golang.org/x/net/html")
	}
	top_level_scripts := htmlWalkAndEmitJS(&buf, 0, htm_body, "shadowRoot", zuiFileHash, nil)
	buf.WriteString(pref + "  }")

	for _, top_level_script := range top_level_scripts {
		buf.WriteString(pref + pref + top_level_script + pref)
	}

	buf.WriteString(pref + "}")
	buf.WriteString(pref + "customElements.define('zui-" + strings.ToLower(zui_class_name) + "_" + zuiFileHash + "', " + zui_class_name + ");")

	return buf.String() + "\n", err
}

func htmlWalkAndEmitJS(buf *strings.Builder, level int, parentNode *html.Node, parentNodeVarName string, zuiFileHash string, topLevelScripts []string) []string {
	if pref := "\n    "; parentNode.Type == html.ElementNode && parentNode.FirstChild != nil {
		child_nodes := []*html.Node{parentNode.FirstChild}
		for next := parentNode.FirstChild.NextSibling; next != nil; next = next.NextSibling {
			child_nodes = append(child_nodes, next)
		}
		for i, child_node := range child_nodes {
			switch child_node.Type {
			case html.TextNode:
				buf.WriteString(pref + parentNodeVarName + ".append(" + strconv.Quote(child_node.Data) + ");")
			case html.ElementNode:
				node_var_name := "node_" + ıf(child_node.Type == html.ElementNode, child_node.Data+"_", "") + strconv.Itoa(level) + "_" + strconv.Itoa(i) + "_" + zuiFileHash
				buf.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(child_node.Data) + ");")
				topLevelScripts = htmlWalkAndEmitJS(buf, level+1, child_node, node_var_name, zuiFileHash, topLevelScripts)
				buf.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}

	return topLevelScripts
}
