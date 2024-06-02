package zui

import (
	"errors"
	"strings"

	"golang.org/x/net/html"
)

func (me *zui2js) doDirectiveAttr(attr *html.Attribute, jsVarNameCurNode string, jsAttrValFnName string) error {
	const pref = "\n    "
	switch {
	case strings.HasPrefix(attr.Key, "on:"):
		evt_name := strings.TrimSpace(attr.Key[len("on:"):])
		me.WriteString(pref + jsVarNameCurNode + ".addEventListener('" + evt_name + "', ((evt) => " + jsAttrValFnName + "().bind(this)()).bind(this));")
	default:
		return errors.New(me.zuiFilePath + ": unknown directive '" + attr.Key + "'")
	}
	return nil
}
