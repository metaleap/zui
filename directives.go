package zui

import (
	"errors"
	"slices"
	"strings"

	"golang.org/x/net/html"
)

func (me *zui2js) doDirectiveAttr(attr *html.Attribute, jsVarNameCurNode string, jsAttrValFnName string, part *htmlTextAndExprsSplitItem) error {
	const pref = "\n    "
	attr_name := strTrim(attr.Key)
	assert(attr_name != "")
	switch {

	case strings.HasPrefix(attr_name, "on:"):
		parts := strings.Split(strTrim(attr_name[len("on:"):]), "|")
		evt_name := strTrim(parts[0])
		if evt_name == "" {
			return errors.New(me.zuiFilePath + ": event name missing after `on:`")
		}
		evt_fwd, evt_mods := (jsAttrValFnName == ""), parts[1:]
		if evt_fwd {
			jsAttrValFnName = me.nextFnName()
			me.WriteString(pref + "const " + jsAttrValFnName + " = (() => ((evt) => {")
			me.WriteString(pref + "  this.dispatch('" + evt_name + "', evt.detail);")
			me.WriteString(pref + "}));")
		}
		if len(evt_mods) > 0 {
			evt_once := slices.Contains(evt_mods, "once")
			evt_prevdef := slices.Contains(evt_mods, "preventDefault")
			evt_stopprop := slices.Contains(evt_mods, "stopPropagation")
			evt_trusted := slices.Contains(evt_mods, "trusted")
			name_fn := me.nextFnName()
			if evt_once {
				me.WriteString(pref + "let o_" + name_fn + " = false;")
			}
			me.WriteString(pref + "const " + name_fn + " = (() => ((evt) => {")
			if evt_once {
				me.WriteString(pref + "  if (o_" + name_fn + ") { return; } else { o_" + name_fn + " = true; }")
			}
			if evt_trusted {
				me.WriteString(pref + "  if (!evt.trusted) { return; }")
			}
			if evt_prevdef {
				me.WriteString(pref + "  evt.preventDefault();")
			}
			if evt_stopprop {
				me.WriteString(pref + "  evt.stopPropagation();")
			}
			me.WriteString(pref + "  " + jsAttrValFnName + "().bind(this)(evt);")
			me.WriteString(pref + "})).bind(this);")
			jsAttrValFnName = name_fn
		}
		me.WriteString(pref + jsVarNameCurNode + ".addEventListener('" + evt_name + "', ((evt) => (" + jsAttrValFnName + ")().bind(this)(evt)).bind(this)" +
			ıf(!slices.Contains(evt_mods, "capture"), "", ", { capture: true }") + ");")

	case strings.HasPrefix(attr_name, "bind:"):
		if part == nil || part.jsExpr == nil {
			return errors.New(me.zuiFilePath + ": invalid 'bind' argument `" + attr.Val + "`")
		}
		js_expr_frag := strings.TrimSuffix(jsString(part.jsExpr), ";")
		println(">>>>>>>>>" + js_expr_frag + "<<<<<<<<<")

	default:
		return errors.New(me.zuiFilePath + ": unknown directive '" + attr_name + "'")
	}
	return nil
}
