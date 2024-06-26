package zui

import (
	"errors"
	"slices"
	"strconv"
	"strings"
	"time"
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
	if node == nil {
		return ""
	}
	switch node.Type {
	case html.TextNode:
		return node.Data
	case html.CommentNode:
		return "<!--" + node.Data + "-->"
	case html.ElementNode, html.DocumentNode:
		ret := "<" + node.Data
		for _, attr := range node.Attr {
			ret += " " + attr.Key + "=" + strQ(attr.Val)
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

func htmlTextIsFullyWhitespace(s string) bool {
	for _, r := range s {
		if !unicode.IsSpace(r) {
			return false
		}
	}
	return true
}

func htmlNumTagNodes(parentNode *html.Node) (n int) {
	if parentNode != nil {
		for node := parentNode.FirstChild; node != nil; node = node.NextSibling {
			if node.Type == html.ElementNode && node.Data != "" {
				n++
			}
		}
	}
	return
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
	text           string
	jsExpr         js.INode
	jsExprAsHtml   bool
	jsTopLevelRefs []string
	jsBlockKind    BlockKind
}

func (me *zui2js) htmlSplitTextAndJSExprs(htmlText string) (ret []htmlTextAndExprsSplitItem, _ error) {
	html_text_orig := angleBracketSentinelReplUndo.Replace(htmlText) // for error messages only
	for {
		idx_open := strings.IndexByte(htmlText, '{')
		if idx_open < 0 {
			if htmlText != "" {
				ret = append(ret, htmlTextAndExprsSplitItem{text: htmlText})
			}
			return
		}
		n, idx_close := 0, -1
		for i := idx_open + 1; i < len(htmlText); i++ {
			if htmlText[i] == '{' {
				n++
			} else if htmlText[i] == '}' {
				if n == 0 {
					idx_close = i // now idx of the `}`
					break
				} else {
					n--
				}
			}
		}
		if idx_close < idx_open {
			if htmlText != "" {
				ret = append(ret, htmlTextAndExprsSplitItem{text: htmlText})
			}
			return
		}
		prev := htmlText[:idx_open]
		cur := htmlText[idx_open : idx_close+1]
		next := htmlText[idx_close+1:]
		if prev != "" {
			ret = append(ret, htmlTextAndExprsSplitItem{text: prev})
		}
		htmlText = next

		src_js := strTrim(cur[:len(cur)-1][1:])
		ret_item := htmlTextAndExprsSplitItem{jsExprAsHtml: strings.HasPrefix(src_js, "@html ") || strings.HasPrefix(src_js, "@html\t") || strings.HasPrefix(src_js, "@html\r") || strings.HasPrefix(src_js, "@html\n") || strings.HasPrefix(src_js, "@html\v") || strings.HasPrefix(src_js, "@html\f") || strings.HasPrefix(src_js, "@html\b")}
		if ret_item.jsExprAsHtml {
			src_js = strTrim(src_js[len("@html"):])
		}
		if src_js == "" {
			return nil, errors.New(me.zuiFilePath + ": expression expected inside the '{}' in '" + html_text_orig + "'")
		}

		src_js = angleBracketSentinelReplUndo.Replace(src_js)
		block_type, src_js, err := me.blocknessCheck(src_js)
		if err != nil {
			return nil, err
		}
		js_ast, err := js.Parse(parse.NewInputString(src_js), js.Options{Inline: true})
		if err != nil {
			return nil, errors.New(me.zuiFilePath + ": '" + err.Error() + "' in '" + src_js + "' near `" + html_text_orig + "`")
		}
		ret_item.jsTopLevelRefs, err = jsWalkAndRewriteTopLevelFuncAST(me, src_js, &js_ast.BlockStmt)
		if err != nil {
			return nil, err
		}
		ret_item.jsExpr, ret_item.jsBlockKind = js_ast, block_type
		ret = append(ret, ret_item)
	}
}

var (
	angleBracketSentinelOpen     = "__zui_abo_" + strconv.FormatInt(time.Now().UnixNano(), 36)
	angleBracketSentinelClose    = "__zui_abc_" + strconv.FormatInt(time.Now().UnixNano(), 36)
	angleBracketSentinelReplDo   = strings.NewReplacer("<", angleBracketSentinelOpen, ">", angleBracketSentinelClose)
	angleBracketSentinelReplUndo = strings.NewReplacer(angleBracketSentinelOpen, "<", angleBracketSentinelClose, ">")
	replApos                     = strings.NewReplacer("'", "&apos;")
)

func htmlPreprocessCurlyAttrs(src string) string {
	idx_start := 0
	for {
		idx_open := strings.Index(src[idx_start:], "={")
		if idx_open < 0 {
			break
		}
		idx_open = idx_open + idx_start + 1 // now idx of the `{`
		n, idx_close := 0, -1
		for i := idx_open + 2; i < len(src); i++ {
			if src[i] == '{' {
				n++
			} else if src[i] == '}' {
				if n == 0 {
					idx_close = i // now idx of the `}`
					break
				} else {
					n--
				}
			}
		}
		if idx_close < idx_open {
			break
		}
		prev := src[:idx_open]
		cur := src[idx_open : idx_close+1]
		next := src[idx_close+1:]

		cur = replApos.Replace(angleBracketSentinelReplDo.Replace(cur))
		src = prev + "'" + cur + "'"
		idx_start = len(src)
		src += next
	}
	return src
}

func (me *zui2js) nextFnName() string { me.idxFn++; return "f" + itoa(me.idxFn) }
func (me *zui2js) nextElName() string { me.idxFn++; return "e" + itoa(me.idxFn) }

func (me *zui2js) htmlWalkElemNodeAndEmitJS(node *html.Node, nodeParentVarName string) error {
	const pref = "\n    "
	for child_node := node.FirstChild; child_node != nil; child_node = child_node.NextSibling {
		switch child_node.Type {
		case html.TextNode:
			if err := me.htmlWalkTextNodeAndEmitJS(child_node, node, &nodeParentVarName); err != nil {
				return err
			}
		case html.ElementNode:
			if err := me.htmlWalkTagNodeAndEmitJS(child_node, nodeParentVarName); err != nil {
				return err
			}
		}
	}
	me.WriteString(pref + nodeParentVarName + ".replaceChildren(...n_" + nodeParentVarName + ");")
	return nil
}

func (me *zui2js) htmlWalkTextNodeAndEmitJS(curNode *html.Node, parentNode *html.Node, parentNodeVarName *string) error {
	const pref = "\n    "
	if parentNode.Type == html.ElementNode && parentNode.Data == "style" {
		me.WriteString(pref + "n_" + *parentNodeVarName + ".push(newT(" + strQ(curNode.Data) + "));")
		return nil
	}

	parts, err := me.htmlSplitTextAndJSExprs(curNode.Data)
	if err != nil {
		return err
	}
	for _, part := range parts {

		if part.text != "" {
			me.WriteString(pref + "n_" + *parentNodeVarName + ".push(newT(" + strQ(ıf(htmlTextIsFullyWhitespace(part.text), " ", part.text)) + "));")

		} else if part.jsExpr != nil {
			js_src := strings.TrimSpace(strings.TrimSuffix(jsString(part.jsExpr), ";"))
			if part.jsBlockKind != 0 {
				if err = me.blockFragmentEmitJS(js_src, &part, parentNode, parentNodeVarName); err != nil {
					return err
				}
			} else {
				fn_name, span_var_name := me.nextFnName(), me.nextElName()
				me.WriteString(pref + "const " + fn_name + " = " + me.jsFnCached("(() => ("+js_src+")).bind(this)", fn_name) + ";")
				if part.jsExprAsHtml {
					me.WriteString(pref + "const " + span_var_name + " = newE('span');")
					me.WriteString(pref + span_var_name + ".innerHTML = " + fn_name + "();")
				} else {
					me.WriteString(pref + "const " + span_var_name + " = newT(" + fn_name + "());")
				}
				for _, top_level_decl_name := range part.jsTopLevelRefs {
					if !me.blockFnStackHasDep(top_level_decl_name) {
						me.WriteString(pref + "this.zuiSub('" + top_level_decl_name + "', (() => { " + span_var_name + "." + ıf(part.jsExprAsHtml, "innerHTML", "nodeValue") + " = " + fn_name + "(); }));")
					}
				}
				me.WriteString(pref + "n_" + *parentNodeVarName + ".push(" + span_var_name + ");")
			}
		}

	}
	return nil
}

func (me *zui2js) htmlWalkTagNodeAndEmitJS(curNode *html.Node, parentNodeVarName string) error {
	const pref = "\n    "
	node_var_name := me.nextElName()
	is_zui_tag := curNode.Data == ("zui_" + me.zuiFileIdent)

	if is_zui_tag {
		zui_tag_name := htmlAttr(curNode, "zui-tag-name")
		assert(zui_tag_name != "")
		zui_rel_file_path := me.imports[zui_tag_name]
		if zui_rel_file_path == "" {
			return errors.New(me.zuiFilePath + ": component '" + zui_tag_name + "' was not `import`ed")
		}
		me.WriteString(pref + "const " + node_var_name + " = newE(" + zui_tag_name + ".ZuiTagName);")
	} else {
		me.WriteString(pref + "const " + node_var_name + " = newE(" + strQ(curNode.Data) + ");")
	}
	me.WriteString(pref + "const n_" + node_var_name + " = [];")

	for i := 0; i < len(curNode.Attr); i++ {
		attr := curNode.Attr[i]
		if strings.HasPrefix(attr.Key, "zui-") {
			continue
		}

		spread := ""
		if attr.Val == "" && strings.HasPrefix(attr.Key, "{") && strings.HasSuffix(attr.Key, "}") {
			if attr_key := strTrim(attr.Key[:len(attr.Key)-1][1:]); strings.HasPrefix(attr_key, "...") {
				spread = strTrim(attr_key[len("..."):])
			} else {
				attr.Val = attr.Key
				attr.Key = attr_key
			}
		}

		if spread != "" {
			ref := "this." + ıf(slices.Contains(me.attrExports, spread), "", "#") + spread
			me.WriteString(pref + "for (const prop in " + ref + ") {")
			me.WriteString(pref + "  this.zuiSet(" + node_var_name + ", prop, " + ref + "[prop]);")
			me.WriteString(pref + "}")
		} else {
			parts, err := me.htmlSplitTextAndJSExprs(attr.Val)
			if err != nil {
				return err
			}
			fn_name, attr_val_js_expr, attr_val_js_funcs := "", "", ""
			for _, part := range parts {
				if part.jsExpr != nil {
					attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
					if part.jsExprAsHtml {
						return errors.New(me.zuiFilePath + ": the '@html' special tag is not permitted in any attributes, including '" + attr.Key + "'")
					}
					js_src := strings.TrimSuffix(jsString(part.jsExpr), ";")
					fn_name = me.nextFnName()
					attr_val_js_funcs += (pref + "const " + fn_name + " = " + me.jsFnCached("(() => ("+js_src+")).bind(this)", fn_name) + ";")
					attr_val_js_expr += " (" + fn_name + "()) "
				} else if part.text != "" {
					attr_val_js_expr += ıf(attr_val_js_expr != "", " + ", "")
					attr_val_js_expr += strQ(part.text)
				}
			}
			me.WriteString(attr_val_js_funcs)
			if strings.Contains(attr.Key, ":") {
				if len(parts) > 1 || (len(parts) > 0 && parts[0].jsExpr == nil) {
					return errors.New(me.zuiFilePath + ": invalid directive attribute value in " + attr.Key + "='" + attr.Val + "'")
				}
				var part *htmlTextAndExprsSplitItem
				if len(parts) > 0 {
					part = &parts[0]
				}
				if add_attrs, err := me.doDirectiveAttr(&attr, curNode, node_var_name, fn_name, part); err != nil {
					return err
				} else {
					curNode.Attr = append(curNode.Attr, add_attrs...)
				}
			} else {
				fn_name_attr := me.nextFnName()
				if len(parts) == 1 && parts[0].jsExpr != nil {
					fn_name_attr = fn_name
				} else {
					me.WriteString(pref + "const " + fn_name_attr + " = " + me.jsFnCached("(() => ("+attr_val_js_expr+")).bind(this)", fn_name_attr) + ";")
				}
				me.WriteString(pref + "this.zuiSet(" + node_var_name + ", " + strQ(attr.Key) + ",  " + fn_name_attr + "());")
				attr_decl_sub_done := map[string]bool{}
				for _, it := range me.blockFnStack {
					for _, dep := range it.deps {
						attr_decl_sub_done[dep] = true
					}
				}
				for _, part := range parts {
					for _, top_level_decl_name := range part.jsTopLevelRefs {
						if !attr_decl_sub_done[top_level_decl_name] {
							me.WriteString(pref + "this.zuiSub('" + top_level_decl_name + "', () => " + "this.zuiSet(" + node_var_name + ", " + strQ(attr.Key) + ",  " + fn_name_attr + "()));")
							attr_decl_sub_done[top_level_decl_name] = true
						}
					}
				}
			}
		}
	}

	if err := me.htmlWalkElemNodeAndEmitJS(curNode, node_var_name); err != nil {
		return err
	}

	me.WriteString(pref + "n_" + parentNodeVarName + ".push(" + node_var_name + ");")
	return nil
}
