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

	htm_root, err := html.Parse(strings.NewReader(strings.TrimSpace(zuiFileSrc)))
	if err != nil {
		return "", err
	}

	if true {
		htmlSrc(&buf, htm_root)
		println(buf.String())
		buf.Reset()
	}

	buf.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))
	zui_file_name := filepath.Base(zuiFilePath)
	newline, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	buf.WriteString(newline + "export class " + zui_class_name + " extends HTMLElement {")

	buf.WriteString(newline + "  constructor() {")
	buf.WriteString(newline + "    super();")
	buf.WriteString(newline + "  }")

	buf.WriteString(newline + "  connectedCallback() {")
	buf.WriteString(newline + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	buf.WriteString(newline + "    this.zuiCreateHTMLElements(shadowRoot);")
	buf.WriteString(newline + "  }")

	buf.WriteString(newline + "  disconnectedCallback() {")
	buf.WriteString(newline + "  }")
	buf.WriteString(newline + "  adoptedCallback() {")
	buf.WriteString(newline + "  }")
	buf.WriteString(newline + "  attributeChangedCallback() {")
	buf.WriteString(newline + "  }")

	var htm_head, htm_body, htm_script *html.Node
	for node := htm_root.FirstChild.FirstChild; node != nil; node = node.NextSibling {
		if node.Type == html.ElementNode && node.Data == "head" {
			htm_head = node
		}
		if node.Type == html.ElementNode && node.Data == "body" {
			htm_body = node
		}
	}

	if htm_head != nil {
		for node := htm_head.FirstChild; node != nil; node = node.NextSibling {
			if node.Type == html.ElementNode && node.Data == "script" {
				if htm_script != nil {
					panic(zuiFilePath + ": A component can only have one top-level <script> element")
				}
				htm_script = node
			}
		}
	}

	buf.WriteString(newline + "  zuiCreateHTMLElements(shadowRoot) {")
	if htm_body != nil {
		for node := htm_body.FirstChild; node != nil; node = node.NextSibling {
			if node.Type == html.ElementNode && node.Data == "script" {
				if htm_script != nil {
					panic(zuiFilePath + ": A component can only have one top-level <script> element")
				}
				htm_script = node
			}
		}

		htmlWalkBodyAndEmitJS(&buf, 0, htm_body, "shadowRoot", zuiFileHash)
	}
	buf.WriteString(newline + "  }")

	if htm_script != nil {
		buf.WriteString(newline + newline + htm_script.FirstChild.Data + newline)
	}

	buf.WriteString(newline + "}")
	buf.WriteString(newline + "customElements.define('zui-" + strings.ToLower(zui_class_name) + "_" + zuiFileHash + "', " + zui_class_name + ");")

	return buf.String() + "\n", err
}

func htmlWalkBodyAndEmitJS(buf *strings.Builder, level int, parentNode *html.Node, parentNodeVarName string, zuiFileHash string) {
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
				htmlWalkBodyAndEmitJS(buf, level+1, child_node, node_var_name, zuiFileHash)
				buf.WriteString(pref + parentNodeVarName + ".appendChild(" + node_var_name + ");")
			}
		}
	}
}
