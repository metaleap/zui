package zui

import (
	"errors"
	"slices"
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

type blockFnStackItem struct {
	kind           BlockKind
	fnName         string
	deps           []string
	namePrevParent string
	nameSelfParent string
}

func (me *zui2js) blocknessCheck(src string) (BlockKind, string, error) {
	switch {
	case !(strings.HasPrefix(src, "#") || strings.HasPrefix(src, ":") || strings.HasPrefix(src, "/")):
		return 0, src, nil
	case strings.HasPrefix(src, "#if "):
		return BlockIfStart, src[len("#if "):], nil
	case strings.HasPrefix(src, ":else if "):
		return BlockIfElseIf, src[len(":else if "):], nil
	case strings.TrimSpace(src) == ":else":
		return BlockIfElse, "", nil
	case strings.TrimSpace(src) == "/if":
		return BlockIfEnd, "", nil

	case strings.HasPrefix(src, "#each "):
		src_js := src[len("#each "):]
		lhs, rhs, ok := strings.Cut(src_js, " as ")
		if !ok {
			return 0, "", errors.New(me.zuiFilePath + ": expected 'as' in `{" + src + "}`")
		}
		src_js = "const " + rhs + " of " + lhs
		return BlockEachStart, src_js, nil
	case strings.TrimSpace(src) == "/each":
		return BlockEachEnd, "", nil
	}
	return 0, "", errors.New(me.zuiFilePath + ": unrecognized block syntax in `{" + src + "}`")
}

func (me *zui2js) blockFnStackHasDep(dep string) bool {
	return slices.ContainsFunc(me.blockFnStack, func(it *blockFnStackItem) bool {
		return slices.Contains(it.deps, dep)
	})
}

func (me *zui2js) blockFragmentEmitJS(jsSrc string, part *htmlTextAndExprsSplitItem, parentNodeVarName *string) error {
	const pref = "\n    "

	switch part.jsBlockKind {

	case BlockIfStart: // {#if ...}
		it := blockFnStackItem{kind: BlockIfStart, fnName: me.nextFnName(), namePrevParent: *parentNodeVarName, deps: part.jsTopLevelRefs}
		*parentNodeVarName = me.nextElName()
		it.nameSelfParent = *parentNodeVarName
		me.WriteString(pref + "const " + it.nameSelfParent + " = document.createElement('span');")
		me.WriteString(pref + "const " + it.fnName + " = (() => { //startCond")
		me.WriteString(pref + it.nameSelfParent + ".replaceChildren();")
		me.WriteString(pref + "  if (" + jsSrc + ") {")
		me.blockFnStack = append(me.blockFnStack, &it)

	case BlockIfElseIf: // {:else if ...}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsString(part.jsExpr) + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		for _, dep := range part.jsTopLevelRefs {
			if !slices.Contains(it.deps, dep) {
				it.deps = append(it.deps, dep)
			}
		}
		me.WriteString(pref + "  } else if (" + jsSrc + ") {")

	case BlockIfElse: // {:else}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `" + jsString(part.jsExpr) + "`")
		}
		me.WriteString(pref + "  } else {")

	case BlockIfEnd: // {/if}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `" + jsString(part.jsExpr) + "`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		*parentNodeVarName = it.namePrevParent
		me.blockFnStack = me.blockFnStack[:len(me.blockFnStack)-1]
		me.WriteString(pref + "  }")
		me.WriteString(pref + "}).bind(this); //endCond")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
				me.usedSubs = true
			}
		}
		me.WriteString(pref + it.namePrevParent + ".appendChild(" + it.nameSelfParent + ");")

	case BlockEachStart: // {#each ...}
		it := blockFnStackItem{kind: BlockEachStart, fnName: me.nextFnName(), namePrevParent: *parentNodeVarName, deps: part.jsTopLevelRefs}
		*parentNodeVarName = me.nextElName()
		it.nameSelfParent = *parentNodeVarName
		me.WriteString(pref + "const " + it.nameSelfParent + " = document.createElement('span');")
		me.WriteString(pref + "const " + it.fnName + " = (() => { //startLoop")
		me.WriteString(pref + it.nameSelfParent + ".replaceChildren();")
		me.WriteString(pref + "  for (" + jsSrc + ") {")
		me.blockFnStack = append(me.blockFnStack, &it)

	case BlockEachEnd: // {/each}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockEachStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsString(part.jsExpr) + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		*parentNodeVarName = it.namePrevParent
		me.blockFnStack = me.blockFnStack[:len(me.blockFnStack)-1]
		me.WriteString(pref + "  }")
		me.WriteString(pref + "}).bind(this); //endLoop")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
				me.usedSubs = true
			}
		}
		me.WriteString(pref + it.namePrevParent + ".appendChild(" + it.nameSelfParent + ");")

	}
	return nil
}
