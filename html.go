package zui

import (
	"errors"
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

func htmlTopLevelScriptElement(zuiFilePath string, hayStack *html.Node, curScript *html.Node) (*html.Node, error) {
	for node := hayStack.FirstChild; node != nil; node = node.NextSibling {
		if node.Type == html.ElementNode && node.Data == "script" {
			if curScript != nil {
				return nil, errors.New(zuiFilePath + ": " + errMsgMultipleTopLevelScriptElems)
			}
			curScript = node
		}
	}
	return curScript, nil
}
