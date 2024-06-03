package zui

import (
	"errors"
	"strings"
)

type BlockKind int

const (
	_ BlockKind = iota
	BlockIfStart
	BlockIfElseIf
	BlockIfElse
	BlockIfEnd
	BlockEachStart
	BlockEachEnd
	BlockAwaitStart
	BlockAwaitThen
	BlockAwaitCatch
	BlockAwaitEnd
)

type jsBlockFnStackItem struct {
	kind           BlockKind
	fnName         string
	deps           []string
	namePrevParent string
	nameSelfParent string
}

func (me *zui2js) maybeBlockness(src string) (BlockKind, string, error) {
	switch {
	case !(strings.HasPrefix(src, "#") || strings.HasPrefix(src, ":") || strings.HasPrefix(src, "/")):
		return 0, src, nil
	case strings.HasPrefix(src, "#if "):
		return BlockIfStart, src[len("#if "):], nil
	case strings.HasPrefix(src, ":else if "):
		return BlockIfElseIf, src[len(":else if "):], nil
	case strings.TrimSpace(src) == ":else":
		return BlockIfElse, "//", nil
	case strings.TrimSpace(src) == "/if":
		return BlockIfEnd, "//", nil
	}
	return 0, "", errors.New(me.zuiFilePath + ": unrecognized block syntax in '" + src + "'")
}
