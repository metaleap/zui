package zui

import (
	"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/net/html"
)

func FirstLineJS(zuiFileHash string) string {
	return "//" + zuiFileHash + "\n"
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	var buf strings.Builder
	buf.WriteString(FirstLineJS(zuiFileHash))

	htm_root, err := html.Parse(strings.NewReader(zuiFileSrc))
	if err != nil {
		return "", err
	}

	zui_file_name := filepath.Base(zuiFilePath)
	pref, zui_comp_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	buf.WriteString(pref + "export class " + zui_comp_name + " extends HTMLElement {")

	buf.WriteString(pref + "  constructor() {")
	buf.WriteString(pref + "    super();")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  connectedCallback() {")
	buf.WriteString(pref + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	buf.WriteString(pref + "    this.zuiCreateHTMLElements();")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  disconnectedCallback() {")
	buf.WriteString(pref + "  }")
	buf.WriteString(pref + "  adoptedCallback() {")
	buf.WriteString(pref + "  }")
	buf.WriteString(pref + "  attributeChangedCallback() {")
	buf.WriteString(pref + "  }")

	buf.WriteString(pref + "  zuiCreateHTMLElements() {")
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
	buf.WriteString(pref + "customElements.define('zui-" + zui_comp_name + "', " + zui_comp_name + ");")

	return buf.String() + "\n", err
}

func htmlWalkAndEmitJS(buf *strings.Builder, level int, node *html.Node, parentNodeVarName string, zuiFileHash string, topLevelScripts []string) []string {
	pref := "\n    "
	switch node.Type {

	case html.DocumentNode, html.ErrorNode:
		panic(ıf[any](node.Data == "", node, node.Data))

	case html.TextNode:
		buf.WriteString(pref + parentNodeVarName + ".textContent = " + strconv.Quote(node.Data) + ";")

	case html.ElementNode:
		if node.FirstChild != nil {
			child_nodes := []*html.Node{node.FirstChild}
			for prev := node.FirstChild; prev.NextSibling != nil; prev = prev.NextSibling {
				child_nodes = append(child_nodes, prev.NextSibling)
			}
			for i, child_node := range child_nodes {
				node_var_name := "node_" + strconv.Itoa(level) + "_" + strconv.Itoa(i) //+ "_" + zuiFileHash
				buf.WriteString(pref + "const " + node_var_name + " = document.createElement(" + strconv.Quote(node.Data) + ");")
				topLevelScripts = htmlWalkAndEmitJS(buf, level+1, child_node, node_var_name, zuiFileHash, topLevelScripts)
				buf.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}

	return topLevelScripts
}
