package zui

import (
	"errors"
	"path/filepath"
	"strings"

	"github.com/tdewolff/parse/v2/js"
)

func jsString(node js.INode) string {
	var buf strings.Builder
	node.JS(&buf)
	return buf.String()
}

func jsWalkAndRewriteTopLevelFuncAST(zuiFilePath string, funcName string, funcBody *js.BlockStmt, allTopLevelDecls map[string]js.IExpr) error {
	me := jsFuncASTRewriteWalker{
		allTopLevelDecls: allTopLevelDecls,
		funcName:         funcName,
		zuiFilePath:      zuiFilePath,
		gatherMode:       true,
		rewrites:         map[js.IExpr]*js.DotExpr{},
	}
	js.Walk(&me, funcBody)
	if me.err == nil {
		me.gatherMode = false
		js.Walk(&me, funcBody)
	}
	return me.err
}

type jsFuncASTRewriteWalker struct {
	allTopLevelDecls map[string]js.IExpr
	funcName         string
	gatherMode       bool
	zuiFilePath      string

	err      error
	rewrites map[js.IExpr]*js.DotExpr
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
				if me.err = errors.New(me.zuiFilePath + ": top-level decl '" + name + "' shadowed in func '" + me.funcName + "'"); me.err != nil {
					return
				}
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
	switch node := node.(type) {
	case *js.PropertyName:
		if rewrite := me.rewrites[node.Computed]; rewrite != nil {
			node.Computed = rewrite
		}
	case *js.BindingElement:
		if rewrite := me.rewrites[node.Default]; rewrite != nil {
			node.Default = rewrite
		}
	case *js.Field:
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
	case *js.ClassDecl:
		if rewrite := me.rewrites[node.Extends]; rewrite != nil {
			node.Extends = rewrite
		}
	case *js.Element:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.Property:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
	case *js.TemplatePart:
		if rewrite := me.rewrites[node.Expr]; rewrite != nil {
			node.Expr = rewrite
		}
	case *js.Arg:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.IfStmt:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.DoWhileStmt:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.WhileStmt:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.WithStmt:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.ForStmt:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
		if rewrite := me.rewrites[node.Post]; rewrite != nil {
			node.Post = rewrite
		}
	case *js.ForInStmt:
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.ForOfStmt:
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.SwitchStmt:
		if rewrite := me.rewrites[node.Init]; rewrite != nil {
			node.Init = rewrite
		}
	case *js.ReturnStmt:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.ThrowStmt:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.ExportStmt:
		if rewrite := me.rewrites[node.Decl]; rewrite != nil {
			node.Decl = rewrite
		}
	case *js.ExprStmt:
		if rewrite := me.rewrites[node.Value]; rewrite != nil {
			node.Value = rewrite
		}
	case *js.NewExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
	case *js.GroupExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
	case *js.IndexExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
		if rewrite := me.rewrites[node.Y]; rewrite != nil {
			node.Y = rewrite
		}
	case *js.DotExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
	case *js.CommaExpr:
		for i, it := range node.List {
			if rewrite := me.rewrites[it]; rewrite != nil {
				node.List[i] = rewrite
			}
		}
	case *js.UnaryExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
	case *js.BinaryExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
		if rewrite := me.rewrites[node.Y]; rewrite != nil {
			node.Y = rewrite
		}
	case *js.CondExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
		if rewrite := me.rewrites[node.Y]; rewrite != nil {
			node.Y = rewrite
		}
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.CallExpr:
		if rewrite := me.rewrites[node.X]; rewrite != nil {
			node.X = rewrite
		}
		for i, arg := range node.Args.List {
			if rewrite := me.rewrites[arg.Value]; rewrite != nil {
				node.Args.List[i].Value = rewrite
			}
		}
	case *js.TemplateExpr:
		if rewrite := me.rewrites[node.Tag]; rewrite != nil {
			node.Tag = rewrite
		}
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Expr]; rewrite != nil {
				node.List[i].Expr = rewrite
			}
		}
	case *js.Args:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Value]; rewrite != nil {
				node.List[i].Value = rewrite
			}
		}
	case *js.CaseClause:
		if rewrite := me.rewrites[node.Cond]; rewrite != nil {
			node.Cond = rewrite
		}
	case *js.BindingArray:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Default]; rewrite != nil {
				node.List[i].Default = rewrite
			}
		}
	case *js.BindingObject:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Value.Default]; rewrite != nil {
				node.List[i].Value.Default = rewrite
			}
			if it.Key != nil {
				if rewrite := me.rewrites[it.Key.Computed]; rewrite != nil {
					node.List[i].Key.Computed = rewrite
				}
			}
		}
	case *js.VarDecl:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Default]; rewrite != nil {
				node.List[i].Default = rewrite
			}
		}
	case *js.ArrayExpr:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Value]; rewrite != nil {
				node.List[i].Value = rewrite
			}
		}
	case *js.ObjectExpr:
		for i, it := range node.List {
			if rewrite := me.rewrites[it.Value]; rewrite != nil {
				node.List[i].Value = rewrite
			}
			if rewrite := me.rewrites[it.Init]; rewrite != nil {
				node.List[i].Init = rewrite
			}
			if rewrite := me.rewrites[it.Name.Computed]; rewrite != nil {
				node.List[i].Name.Computed = rewrite
			}
		}
	}
}

func jsWalkAndRewriteWholeAST(ast *js.AST, zuiFilePath string) error {
	// for misc. other walk-and-rewrite needs not covered by `jsWalkAndRewriteTopLevelFuncAST`
	me := jsWholeASTRewriter{
		zuiFilePath: zuiFilePath,
		gatherMode:  true,
		rewrites:    map[js.INode]js.INode{},
	}
	js.Walk(&me, &ast.BlockStmt)
	return me.err
}

type jsWholeASTRewriter struct {
	zuiFilePath string
	gatherMode  bool

	err      error
	rewrites map[js.INode]js.INode
}

func (*jsWholeASTRewriter) Exit(js.INode) {}
func (me *jsWholeASTRewriter) Enter(node js.INode) js.IVisitor {
	if me.gatherMode {
		me.gather(node)
	} else {
		me.rewrite(node)
	}
	return ıf(me.err == nil, me, nil)
}

func (me *jsWholeASTRewriter) gather(node js.INode) {
	switch node := node.(type) {
	case *js.TemplateExpr:
		if tag, _ := node.Tag.(*js.Var); tag != nil {
			tail := string(node.Tail)
			assert(strings.HasPrefix(tail, "`") && strings.HasSuffix(tail, "`"))
			tail = strings.Trim(tail, "`")
			switch string(tag.Data) {
			case "zuiPath":
				file_path_from_cur_dir_vantage := filepath.Join(filepath.Dir(me.zuiFilePath), tail)
				file_exists_from_zui_file_vantage := FsIsFile(file_path_from_cur_dir_vantage)
				if file_exists_from_zui_file_vantage {
					me.rewrites[node] = &js.LiteralExpr{
						TokenType: js.StringToken,
						Data:      []byte(file_path_from_cur_dir_vantage),
					}
				} else {
					me.err = errors.New(me.zuiFilePath + ": the zuiPath '" + tail + "' does not exist")
				}
			}
		}
	}
}

func (me *jsWholeASTRewriter) rewrite(node js.INode) {
	jsRewrite[js.INode](node, func(node js.INode) js.INode {
		return me.rewrites[node]
	})
}

func jsRewrite[T js.INode](node js.INode, rewrite func(js.INode) js.INode) {
	switch node := node.(type) {
	case *js.Var:
		if rewrite, _ := rewrite(node.Link).(*js.Var); rewrite != nil {
			node.Link = rewrite
		}
	case *js.BlockStmt:
	case *js.ExprStmt:
	case *js.IfStmt:
	case *js.DoWhileStmt:
	case *js.WhileStmt:
	case *js.ForStmt:
	case *js.ForInStmt:
	case *js.ForOfStmt:
	case *js.CaseClause:
	case *js.SwitchStmt:
	case *js.BranchStmt:
	case *js.ReturnStmt:
	case *js.WithStmt:
	case *js.LabelledStmt:
	case *js.ThrowStmt:
	case *js.TryStmt:
	case *js.DebuggerStmt:
	case *js.Alias:
	case *js.ImportStmt:
	case *js.ExportStmt:
	case *js.DirectivePrologueStmt:
	case *js.PropertyName:
	case *js.BindingArray:
	case *js.BindingObjectItem:
	case *js.BindingObject:
	case *js.BindingElement:
	case *js.VarDecl:
	case *js.Params:
	case *js.FuncDecl:
	case *js.MethodDecl:
	case *js.Field:
	}
}
