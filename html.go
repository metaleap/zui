package zui

import (
	"errors"
	"strconv"
	"strings"
	"unicode"

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
		if node.FirstChild == nil {
			ret += " />"
		} else {
			ret += ">"
			for child_node := node.FirstChild; child_node != nil; child_node = child_node.NextSibling {
				ret += htmlSrc(child_node)
			}
			ret += "</" + node.Data + ">"
		}
		return ret
	}
	return "<?>"
}

func htmlFixupSelfClosingZuiTagsPriorToParsing(zuiFilePath string, zuiFileHash string, srcHtml string) (string, error) {
	for {
		idx_close := strings.Index(srcHtml, "/>")
		if idx_close < 0 {
			break
		}
		idx_open := strings.LastIndexByte(srcHtml[:idx_close], '<')
		if idx_open < 0 {
			break
		}
		name := srcHtml[idx_open+1 : idx_close]
		if name == "" || !((name[0] >= 'a' && name[0] <= 'z') || (name[0] >= 'A' && name[0] <= 'Z')) {
			return "", errors.New(zuiFilePath + ": invalid tag name '" + name + "'")
		}
		idx_space := strings.IndexFunc(name, unicode.IsSpace)
		if idx_space > 0 {
			name = name[:idx_space]
		}
		new_name := name
		if name[0] >= 'A' && name[0] <= 'Z' {
			new_name = "zui-tag_" + zuiFileHash
		}
		srcHtml = srcHtml[:idx_open] + "<" + new_name +
			ıf(name == new_name, "", " zui-tag-name='"+name+"'") +
			srcHtml[idx_open+1+len(name):idx_close] + "></" + new_name + ">" + srcHtml[idx_close+len("/>"):]
	}

	srcHtml = replHtmlFixupSelfClosingBrTagsPriorToParsing.Replace(srcHtml) // html parser oddity: it would turn <br></br> into <br/><br/> (though it won't for img, hr, etc.)
	return srcHtml, nil
}

var replHtmlFixupSelfClosingBrTagsPriorToParsing = strings.NewReplacer("</br>", "")

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
		if err = jsWalkAndRewriteTopLevelFuncAST(zuiFilePath, src_js, &js_ast.BlockStmt, allTopLevelDecls); err != nil {
			return nil, err
		}
		ret = append(ret, js_ast)
	}
}
