package zui

import (
	"errors"
	"strings"

	"github.com/tdewolff/parse/v2/js"
)

func jsString(node js.INode) string {
	var buf strings.Builder
	node.JS(&buf)
	return buf.String()
}

func walkAndRewriteTopLevelFuncAST(zuiFilePath string, funcName string, funcBody *js.BlockStmt, allTopLevelDecls map[string]js.IExpr) error {
	it := jsFuncASTRewriteWalker{
		allTopLevelDecls: allTopLevelDecls,
		funcName:         funcName,
		zuiFilePath:      zuiFilePath,
		gatherMode:       true,
		rewrites:         map[js.IExpr]js.IExpr{},
	}
	js.Walk(&it, funcBody)
	if it.err == nil {
		it.gatherMode = false
		js.Walk(&it, funcBody)
	}
	return it.err
}

type jsFuncASTRewriteWalker struct {
	allTopLevelDecls map[string]js.IExpr
	funcName         string
	gatherMode       bool
	zuiFilePath      string

	err      error
	rewrites map[js.IExpr]js.IExpr
}

func (*jsFuncASTRewriteWalker) Exit(js.INode) {}
func (me *jsFuncASTRewriteWalker) Enter(node js.INode) js.IVisitor {
	if me.gatherMode {
		me.gather(node)
	} else {
		me.rewrite(node)
	}
	return ıf(me.err == nil, me, nil)
}
func (me *jsFuncASTRewriteWalker) gather(node js.INode) {
	switch node := node.(type) {
	case *js.VarDecl:
		for _, item := range node.List {
			name := jsString(item.Binding)
			if _, is_top_level := me.allTopLevelDecls[name]; is_top_level {
				me.err = errors.New(me.zuiFilePath + ": top-level decl '" + name + "' shadowed in top-level func '" + me.funcName + "'")
			}
		}
	case *js.Var:
		name := string(node.Data)
		if _, is_top_level := me.allTopLevelDecls[name]; is_top_level {
			me.rewrites[node] = &js.DotExpr{
				X: &js.Var{Data: []byte("this")},
				Y: js.LiteralExpr{TokenType: js.StringToken, Data: []byte(name)},
			}
		}
	}
}
func (me *jsFuncASTRewriteWalker) rewrite(node js.INode) {
	// var nodes []js.INode
	switch node := node.(type) {
	case *js.CommaExpr:
		for i, expr := range node.List {
			if rewrite := me.rewrites[expr]; rewrite != nil {
				node.List[i] = rewrite
			}
		}
	case *js.Args:
		for i, arg := range node.List {
			if rewrite := me.rewrites[arg.Value]; rewrite != nil {
				node.List[i].Value = rewrite
			}
		}
	case *js.TemplateExpr:
		for i, tmpl_part := range node.List {
			if rewrite := me.rewrites[tmpl_part.Expr]; rewrite != nil {
				node.List[i].Expr = rewrite
			}
		}
	case *js.BlockStmt:
	case *js.CaseClause:
	case *js.SwitchStmt:
	case *js.BindingArray:
	case *js.BindingObject:
	case *js.VarDecl:
	case *js.ArrayExpr:
	case *js.ObjectExpr:
	}
}

func jsTo[T js.INode](in []T) (ret []js.INode) {
	ret = make([]js.INode, len(in))
	for i, it := range in {
		ret[i] = it
	}
	return
}
