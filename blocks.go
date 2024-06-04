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
	tmpTag         string
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

	case strings.HasPrefix(src, "#await "):
		return BlockAwaitStart, src[len("#await "):], nil
	case strings.HasPrefix(src, ":then "):
		return BlockAwaitThen, src[len(":then "):], nil
	case strings.HasPrefix(src, ":catch "):
		return BlockAwaitCatch, src[len(":catch "):], nil
	case strTrim(src) == "/await":
		return BlockAwaitEnd, "", nil

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

	case BlockAwaitStart:
		it := blockFnStackItem{kind: BlockIfStart, fnName: me.nextFnName(), namePrevParent: *parentNodeVarName, deps: part.jsTopLevelRefs}
		*parentNodeVarName = me.nextElName()
		it.nameSelfParent, it.tmpTag = *parentNodeVarName, jsSrc
		me.WriteString(pref + "const " + it.nameSelfParent + " = newE('zui-wait');")
		me.WriteString(pref + "const n_" + it.nameSelfParent + " = [];")
		me.WriteString(pref + "const " + it.fnName + " = (async () => { //startWait")
		me.blockFnStack = append(me.blockFnStack, &it)

	case BlockAwaitThen:
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsSrc + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		me.WriteString(pref + "  " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "  n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "  try {")
		me.WriteString(pref + "    const " + jsSrc + " = await " + it.tmpTag + ";")

	case BlockAwaitCatch:
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsSrc + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		me.WriteString(pref + "    " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "    n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "  } catch (" + jsSrc + ") {")

	case BlockAwaitEnd:
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `" + jsSrc + "`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		*parentNodeVarName = it.namePrevParent
		me.blockFnStack = me.blockFnStack[:len(me.blockFnStack)-1]
		me.WriteString(pref + "    " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "    n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "  }")
		me.WriteString(pref + "}).bind(this); //endWait")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
			}
		}
		me.WriteString(pref + "n_" + it.namePrevParent + ".push(" + it.nameSelfParent + ");")

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
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsSrc + "}`")
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
			return errors.New(me.zuiFilePath + ": unmatched `" + jsSrc + "`")
		}
		me.WriteString(pref + "  } else {")

	case BlockIfEnd: // {/if}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockIfStart {
			return errors.New(me.zuiFilePath + ": unmatched `" + jsSrc + "`")
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
		names := strings.Split(jsSrc[:len(jsSrc)-1][1:], ",")
		assert(len(names) == 4)
		for i, name := range names {
			names[i] = strTrim(name)
		}
		loop_arr, loop_item, loop_idx, loop_id := names[0], names[1], names[2], names[3]
		it := blockFnStackItem{kind: BlockEachStart, fnName: me.nextFnName(), namePrevParent: *parentNodeVarName, deps: part.jsTopLevelRefs}
		*parentNodeVarName = me.nextElName()
		it.nameSelfParent = *parentNodeVarName

		me.WriteString(pref + "const " + it.nameSelfParent + " = newE('zui-loop');")
		me.WriteString(pref + "const n_" + it.nameSelfParent + " = [];")
		if loop_id != "" {
			// me.WriteString(pref + "const c_" + it.nameSelfParent + " = new Map();")
		}
		me.WriteString(pref + "const " + it.fnName + " = (() => { //startLoop")
		assert(jsSrc[0] == '[' && jsSrc[len(jsSrc)-1] == ']')
		if loop_idx != "null" {
			me.WriteString(pref + "  let " + loop_idx + " = -1;")
		}
		me.WriteString(pref + "  n_" + it.nameSelfParent + ".splice(0);")
		me.WriteString(pref + "  for (const " + loop_item + " of " + loop_arr + ") {")
		if loop_idx != "null" {
			me.WriteString(pref + "  " + loop_idx + "++;")
		}
		me.blockFnStack = append(me.blockFnStack, &it)

	case BlockEachEnd: // {/each}
		if len(me.blockFnStack) == 0 || me.blockFnStack[len(me.blockFnStack)-1].kind != BlockEachStart {
			return errors.New(me.zuiFilePath + ": unmatched `{" + jsSrc + "}`")
		}
		it := me.blockFnStack[len(me.blockFnStack)-1]
		*parentNodeVarName = it.namePrevParent
		me.blockFnStack = me.blockFnStack[:len(me.blockFnStack)-1]
		me.WriteString(pref + "  }")
		me.WriteString(pref + "  if (n_" + it.nameSelfParent + ".length != " + it.nameSelfParent + ".childNodes.length)")
		me.WriteString(pref + "    " + it.nameSelfParent + ".replaceChildren(...n_" + it.nameSelfParent + ");")
		me.WriteString(pref + "  else")
		me.WriteString(pref + "    for (let i = 0; i < n_" + it.nameSelfParent + ".length; i++) {")
		me.WriteString(pref + "      if (!n_" + it.nameSelfParent + "[i].isEqualNode(" + it.nameSelfParent + ".childNodes[i]))")
		me.WriteString(pref + "        " + it.nameSelfParent + ".replaceChild(n_" + it.nameSelfParent + "[i], " + it.nameSelfParent + ".childNodes[i]);")
		me.WriteString(pref + "    }")
		me.WriteString(pref + "}).bind(this); //endLoop")
		me.WriteString(pref + it.fnName + "();")
		for _, dep := range it.deps {
			if !me.blockFnStackHasDep(dep) {
				me.WriteString(pref + "this.zuiSub(" + strQ(dep) + ", " + it.fnName + ");")
			}
		}
		me.WriteString(pref + "n_" + it.namePrevParent + ".push(" + it.nameSelfParent + ");")

	default:
		panic("TODO: " + itoa(int(part.jsBlockKind)))

	}
	return nil
}
