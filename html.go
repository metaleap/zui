package zui

import (
	"errors"
	"strconv"

	"golang.org/x/net/html"
)

func htmlSrc(node *html.Node) string {
	switch node.Type {
	case html.TextNode:
		return node.Data
	case html.CommentNode:
		return "<!--" + node.Data + "-->"
	case html.ElementNode, html.DocumentNode:
		ret := "<" + node.Data
		for _, attr := range node.Attr {
			ret += " " + attr.Key + "=" + strconv.Quote(attr.Val)
		}
		ret += ">"
		for child_node := node.FirstChild; child_node != nil; child_node = child_node.NextSibling {
			ret += htmlSrc(child_node)
		}
		ret += "</" + node.Data + ">"
		return ret
	}
	return "<?>"
}

func htmlTopLevelScriptElement(zuiFilePath string, hayStack *html.Node, curScript *html.Node) (*html.Node, error) {
	for node := hayStack.FirstChild; node != nil; node = node.NextSibling {
		if node.Type == html.ElementNode && node.Data == "script" {
			if curScript != nil {
				return nil, errors.New(zuiFilePath + ": A component can only have one top-level <script> element")
			}
			curScript = node
		}
	}
	return curScript, nil
}
