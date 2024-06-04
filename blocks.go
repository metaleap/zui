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
	case strTrim(src) == ":else":
		return BlockIfElse, "", nil
	case strTrim(src) == "/if":
		return BlockIfEnd, "", nil

	case strings.HasPrefix(src, "#each "):
		src_js := src[len("#each "):]
		lhs, rhs, ok := strings.Cut(src_js, " as ")
		if !ok {
			return 0, "", errors.New(me.zuiFilePath + ": expected 'as' in `{" + src + "}`")
		}
		rhs, id, _ := strings.Cut(rhs, "(")
		id = strTrim(strings.TrimSuffix(strTrim(id), ")"))
		name, idx, _ := strings.Cut(rhs, ",")
		if lhs, name, idx = strTrim(lhs), strTrim(name), strTrim(idx); lhs == "" || name == "" {
			return 0, "", errors.New(me.zuiFilePath + ": expected identifiers around 'as' in `{" + src + "}`")
		}
		src_js = "[" + lhs + "," + name + "," + ıf(idx == "", "null", idx) + "," + ıf(id == "", "null", id) + "]"
		return BlockEachStart, src_js, nil
	case strTrim(src) == "/each":
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
		me.WriteString(pref + "const " + it.nameSelfParent + " = newE('zui-cond');")
		me.WriteString(pref + "const n_" + it.nameSelfParent + " = [];")
		me.WriteString(pref + "const " + it.fnName + " = (() => { //startCond")
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
		me.WriteString(pref + "  " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "  n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "}).bind(this); //endCond")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
			}
		}
		me.WriteString(pref + "n_" + it.namePrevParent + ".push(" + it.nameSelfParent + ");")

	case BlockEachStart: // {#each ...}
		it := blockFnStackItem{kind: BlockEachStart, fnName: me.nextFnName(), namePrevParent: *parentNodeVarName, deps: part.jsTopLevelRefs}
		*parentNodeVarName = me.nextElName()
		it.nameSelfParent = *parentNodeVarName
		me.WriteString(pref + "const " + it.nameSelfParent + " = newE('zui-loop');")
		me.WriteString(pref + "const n_" + it.nameSelfParent + " = [];")
		me.WriteString(pref + "const " + it.fnName + " = (() => { //startLoop")
		assert(jsSrc[0] == '[' && jsSrc[len(jsSrc)-1] == ']')
		names := strings.Split(jsSrc[:len(jsSrc)-1][1:], ",")
		assert(len(names) == 4)
		for i, name := range names {
			names[i] = strTrim(name)
		}
		if var_name_idx := names[2]; var_name_idx != "null" {
			me.WriteString(pref + "  let " + var_name_idx + " = -1;")
		}
		me.WriteString(pref + "  for (const " + names[1] + " of " + names[0] + ") {")
		if var_name_idx := names[2]; var_name_idx != "null" {
			me.WriteString(pref + "  " + var_name_idx + "++;")
		}
		if expr_id := names[3]; expr_id != "null" {
			var_name_item := "it_" + names[1]
			me.WriteString(pref + "  const " + var_name_item + " = newE('zui-item');")
			me.WriteString(pref + "  " + var_name_item + ".setAttribute('item-id', " + expr_id + ");")
			me.WriteString(pref + "  const   n_" + var_name_item + " = [];")
		}
		me.blockFnStack = append(me.blockFnStack, &it)

	case BlockEachEnd: // {/each}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockEachStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsString(part.jsExpr) + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		*parentNodeVarName = it.namePrevParent
		me.blockFnStack = me.blockFnStack[:len(me.blockFnStack)-1]

		// me.WriteString(pref + "  </zui-item>")
		me.WriteString(pref + "  }")
		me.WriteString(pref + "  " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "  n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "}).bind(this); //endLoop")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
			}
		}
		me.WriteString(pref + "n_" + it.namePrevParent + ".push(" + it.nameSelfParent + ");")

	}
	return nil
}
