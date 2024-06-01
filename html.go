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

var (
	replDashToUnderscore = strings.NewReplacer("-", "_")
	replRemoveBrCloseTag = strings.NewReplacer("</br>", "")
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

func htmlAttr(node *html.Node, attrName string) string {
	for _, attr := range node.Attr {
		if attr.Key == attrName {
			return attr.Val
		}
	}
	return ""
}

func htmlReplaceNode(parentNode *html.Node, oldChildNode *html.Node, newChildNodes ...*html.Node) {
	for i, new_child_node := range newChildNodes {
		if i < len(newChildNodes)-1 {
			new_child_node.NextSibling = newChildNodes[i+1]
		}
		if i > 0 {
			new_child_node.PrevSibling = newChildNodes[i-1]
		}
	}
	for old_child_node := parentNode.FirstChild; old_child_node != nil; old_child_node = old_child_node.NextSibling {
		if old_child_node == oldChildNode {
			if idx := 0; old_child_node.PrevSibling != nil {
				old_child_node.PrevSibling.NextSibling = newChildNodes[idx]
				newChildNodes[idx].PrevSibling = old_child_node.PrevSibling
			}
			if idx := len(newChildNodes) - 1; old_child_node.NextSibling != nil {
				old_child_node.NextSibling.PrevSibling = newChildNodes[idx]
				newChildNodes[idx].NextSibling = old_child_node.NextSibling
			}
		}
	}
}

func (me *zui2js) htmlFixupSelfClosingZuiTagsPriorToParsing() (string, error) {
	src_htm, zuiTagName := me.zuiFileSrcOrig, "zui_"+me.zuiFileIdent
	for {
		idx_close := strings.Index(src_htm, "/>")
		if idx_close < 0 {
			break
		}
		idx_open := strings.LastIndexByte(src_htm[:idx_close], '<')
		if idx_open < 0 {
			break
		}
		name := src_htm[idx_open+1 : idx_close]
		if name == "" || !((name[0] >= 'a' && name[0] <= 'z') || (name[0] >= 'A' && name[0] <= 'Z')) {
			return "", errors.New(me.zuiFilePath + ": invalid tag name '" + name + "'")
		}
		idx_space := strings.IndexFunc(name, unicode.IsSpace)
		if idx_space > 0 {
			name = name[:idx_space]
		}
		new_name := name
		if name[0] >= 'A' && name[0] <= 'Z' {
			new_name = zuiTagName
		}
		src_htm = src_htm[:idx_open] + "<" + new_name +
			ıf(name == new_name, "", " zui-tag-name='"+name+"'") +
			src_htm[idx_open+1+len(name):idx_close] + "></" + new_name + ">" + src_htm[idx_close+len("/>"):]
	}

	src_htm = replRemoveBrCloseTag.Replace(src_htm) // html parser oddity: it would turn <br></br> into <br/><br/> (though it won't for img, hr, etc.)
	return src_htm, nil
}

func (me *zui2js) htmlTopLevelScriptElement(hayStack *html.Node, curScript *html.Node) (*html.Node, error) {
	for node := hayStack.FirstChild; node != nil; node = node.NextSibling {
		if node.Type == html.ElementNode && node.Data == "script" {
			if curScript != nil {
				return nil, errors.New(me.zuiFilePath + ": A component can only have one top-level <script> element")
			}
			curScript = node
		}
	}
	return curScript, nil
}

type htmlTextAndExprsSplitItem struct {
	text             string
	expr             js.INode
	exprAsHtml       bool
	exprTopLevelRefs []string
}

func (me *zui2js) htmlSplitTextAndJSExprs(htmlText string) (ret []htmlTextAndExprsSplitItem, _ error) {
	html_text_orig := htmlText
	for {
		idx_close := strings.IndexByte(htmlText, '}')
		if idx_close < 0 {
			if htmlText != "" {
				ret = append(ret, htmlTextAndExprsSplitItem{text: htmlText})
			}
			return
		}
		idx_open := strings.LastIndexByte(htmlText[:idx_close], '{')
		if idx_open < 0 {
			return nil, errors.New(me.zuiFilePath + ": unmatched closing brace in '" + html_text_orig + "'")
		}
		if pre := htmlText[:idx_open]; pre != "" {
			ret = append(ret, htmlTextAndExprsSplitItem{text: pre})
		}
		src_js := strings.TrimSpace(htmlText[:idx_close][idx_open+1:])
		is_html := strings.HasPrefix(src_js, "@html ") || strings.HasPrefix(src_js, "@html\t") || strings.HasPrefix(src_js, "@html\r") || strings.HasPrefix(src_js, "@html\n")
		if is_html {
			src_js = strings.TrimSpace(src_js[len("@html"):])
		}
		if src_js == "" {
			return nil, errors.New(me.zuiFilePath + ": expression expected inside the '{}' in '" + html_text_orig + "'")
		}
		htmlText = htmlText[idx_close+1:]

		js_ast, err := js.Parse(parse.NewInputString(src_js), js.Options{Inline: true})
		if err != nil {
			return nil, errors.New(me.zuiFilePath + ": " + err.Error() + " in JS expr '" + src_js + "'")
		}
		all_top_level_refs, err := jsWalkAndRewriteTopLevelFuncAST(me, src_js, &js_ast.BlockStmt)
		if err != nil {
			return nil, err
		}
		ret = append(ret, htmlTextAndExprsSplitItem{expr: js_ast, exprAsHtml: is_html, exprTopLevelRefs: all_top_level_refs})
	}
}
