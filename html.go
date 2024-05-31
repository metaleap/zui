package zui

import (
	"errors"
	"strconv"
	"strings"

	"golang.org/x/net/html"

	"github.com/tdewolff/parse/v2"
	"github.com/tdewolff/parse/v2/js"
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

func htmlSplitTextAndJSExprs(zuiFilePath string, htmlText string, allTopLevelDecls map[string]js.IExpr) (ret []any, _ error) {
	html_text_orig := htmlText
	for {
		idx_close := strings.IndexByte(htmlText, '}')
		if idx_close < 0 {
			ret = append(ret, htmlText)
			return
		}
		idx_open := strings.LastIndexByte(htmlText[:idx_close], '{')
		if idx_open < 0 {
			return nil, errors.New(zuiFilePath + ": unmatched closing brace in '" + html_text_orig + "'")
		}
		if pre := htmlText[:idx_open]; pre != "" {
			ret = append(ret, pre)
		}
		src_js := htmlText[:idx_close][idx_open+1:]
		if src_js == "" {
			return nil, errors.New(zuiFilePath + ": expression expected inside the '{}' in '" + html_text_orig + "'")
		}
		htmlText = htmlText[idx_close+1:]

		js_ast, err := js.Parse(parse.NewInputString(src_js), js.Options{Inline: true})
		if err != nil {
			return nil, errors.New(zuiFilePath + ": " + err.Error() + " in JS expr '" + src_js + "'")
		}
		if err = walkAndRewriteTopLevelFuncAST(zuiFilePath, src_js, &js_ast.BlockStmt, allTopLevelDecls); err != nil {
			return nil, err
		}
		ret = append(ret, js_ast)
	}
}
