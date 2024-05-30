package zui

import (
	"strings"

	"golang.org/x/net/html"
)

func htmlSrc(buf *strings.Builder, node *html.Node) {
	switch node.Type {
	case html.TextNode:
		buf.WriteString(node.Data)
	case html.ElementNode, html.DocumentNode:
		buf.WriteString("<" + node.Data + ">")
		for child_node := node.FirstChild; child_node != nil; child_node = child_node.NextSibling {
			htmlSrc(buf, child_node)
		}
		buf.WriteString("</" + node.Data + ">")
	}
}
