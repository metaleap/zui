package zui

import (
	"strings"

	"github.com/tdewolff/parse/v2/js"
)

func jsString(node js.INode) string {
	var buf strings.Builder
	node.JS(&buf)
	return buf.String()
}

func jsWalkFunc() {

}
