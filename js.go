package zui

import (
	"errors"
	"slices"
	"strings"

	"github.com/tdewolff/parse/v2/js"
)

func jsString(node js.INode) string {
	var buf strings.Builder
	node.JS(&buf)
	return buf.String()
}

func (me *zui2js) jsFnCached(src string, varName string) string {
	existing_var_name := me.jsFnNameCache[src]
	if existing_var_name == "" {
		me.jsFnNameCache[src] = varName
		return src
	}
	return existing_var_name
}

func jsAssigneeNameInLabelledStmt(stmt *js.LabelledStmt) string {
	return string(stmt.Value.(*js.ExprStmt).Value.(*js.BinaryExpr).X.(*js.Var).Name())
}

func jsWalkAndRewriteTopLevelFuncAST(state *zui2js, funcName string, funcBody js.INode) ([]string, error) {
	me := jsFuncASTRewriteWalker{
		state:           state,
		funcName:        funcName,
		gatherMode:      true,
		rewrites:        map[js.INode]js.INode{},
		allTopLevelRefs: map[string]bool{},
	}
	js.Walk(&me, funcBody)
	if me.err == nil {
		me.gatherMode = false
		js.Walk(&me, funcBody)
	}
	return orderedMapKeys(me.allTopLevelRefs), me.err
}

type jsFuncASTRewriteWalker struct {
	state      *zui2js
	funcName   string
	gatherMode bool

	err             error
	rewrites        map[js.INode]js.INode
	allTopLevelRefs map[string]bool
}

func (*jsFuncASTRewriteWalker) Exit(js.INode) {}
func (me *jsFuncASTRewriteWalker) Enter(node js.INode) js.IVisitor {
	if me.gatherMode {
		me.gather(node)
	} else {
		me.rewrite(node)
	}
	return ıf[js.IVisitor](me.err == nil, me, nil)
}

func (me *jsFuncASTRewriteWalker) gather(node js.INode) {
	switch node := node.(type) {
	case *js.VarDecl:
		for _, item := range node.List {
			name := jsString(item.Binding)
			if me.isTopLevel(name) {
				if me.err = errors.New(me.state.zuiFilePath + ": top-level decl '" + name + "' shadowed in '" + ıf(me.funcName != "", me.funcName, jsString(node)) + "'"); me.err != nil {
					return
				}
			}
		}
	case *js.Var:
		name := string(node.Data)
		if me.isTopLevel(name) {
			me.allTopLevelRefs[name] = true
			me.rewrites[node] = &js.DotExpr{
				X: &js.Var{Data: []byte("this")},
				Y: js.LiteralExpr{TokenType: js.StringToken, Data: []byte(ıf(slices.Contains(me.state.attrExports, name), name, "#"+name))},
			}
		}
	case *js.ExprStmt:
		bin_op, _ := node.Value.(*js.BinaryExpr)
		if bin_op == nil {
			return
		}

		op := bin_op.Op.String()
		is_assign := strings.Contains(op, "=") && !strings.Contains(op, "==") && (op != "!=") && (op != ">=") && (op != "<=")
		if is_assign {
			if lhs, dot_or_idx := me.findLhsVar(bin_op.X, false); lhs != nil && dot_or_idx {
				if name := string(lhs.Data); me.isTopLevel(name) {
					me.rewrites[node] = &js.BlockStmt{List: []js.IStmt{
						&js.ExprStmt{Value: &js.BinaryExpr{
							X: bin_op.X, Y: bin_op.Y, Op: bin_op.Op,
						}},
						&js.ExprStmt{Value: &js.CallExpr{
							X: &js.DotExpr{
								X: &js.Var{Data: []byte("this")},
								Y: js.LiteralExpr{TokenType: js.StringToken, Data: []byte("zuiOnPropChanged")},
							},
							Args: js.Args{List: []js.Arg{
								{Value: &js.LiteralExpr{TokenType: js.StringToken, Data: []byte(strQ(name))}},
							}},
						}},
					}}

				}
			}
		}
	}
}

func (me *jsFuncASTRewriteWalker) isTopLevel(name string) bool {
	_, is_top_level := me.state.topLevelDecls[name]
	if !is_top_level {
		for k := range me.state.topLevelReactiveDecls {
			if jsAssigneeNameInLabelledStmt(k) == name {
				is_top_level = true
				break
			}
		}
	}
	return is_top_level
}

func (me *jsFuncASTRewriteWalker) findLhsVar(lhs js.IExpr, compound bool) (*js.Var, bool) {
	switch lhs := lhs.(type) {
	case *js.Var:
		return lhs, compound
	case *js.IndexExpr:
		return me.findLhsVar(lhs.X, true)
	case *js.DotExpr:
		return me.findLhsVar(lhs.X, true)
	}
	return nil, false
}

func (me *jsFuncASTRewriteWalker) rewrite(node js.INode) {
	jsRewrite(node, func(node js.INode) js.INode {
		return ıf(me.err == nil, me.rewrites[node], nil)
	})
}

func jsWalkAndRewriteWholeAST(state *zui2js, ast *js.AST) error {
	// for misc. other walk-and-rewrite needs not covered by `jsWalkAndRewriteTopLevelFuncAST`
	me := jsWholeASTRewriter{
		state:      state,
		gatherMode: true,
		rewrites:   map[js.INode]js.INode{},
	}
	if js.Walk(&me, &ast.BlockStmt); me.err == nil {
		me.gatherMode = false
		js.Walk(&me, &ast.BlockStmt)
	}
	return me.err
}

type jsWholeASTRewriter struct {
	state      *zui2js
	gatherMode bool

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
	return ıf[js.IVisitor](me.err == nil, me, nil)
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
				file_path_from_cur_dir_vantage, err := me.state.fileRelPath(tail)
				if me.err = err; err == nil {
					me.rewrites[node] = &js.LiteralExpr{
						TokenType: js.StringToken,
						Data:      []byte("'" + file_path_from_cur_dir_vantage + "'"),
					}
				}
			}
		}

	}
}

func (me *jsWholeASTRewriter) rewrite(node js.INode) {
	jsRewrite(node, func(node js.INode) js.INode {
		return ıf(me.err == nil, me.rewrites[node], nil)
	})
}

func jsRewrite(node js.INode, rewrite func(js.INode) js.INode) {
	if node == nil {
		return
	}
	switch node := node.(type) {
	case *js.Var:
		if re, _ := rewrite(node.Link).(*js.Var); re != nil {
			node.Link = re
		}
	case *js.BlockStmt:
		for i := range node.List {
			if re, _ := rewrite(node.List[i]).(js.IStmt); re != nil {
				node.List[i] = re
			}
		}
	case *js.ExprStmt:
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
	case *js.IfStmt:
		if re, _ := rewrite(node.Body).(js.IStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Else).(js.IStmt); re != nil {
			node.Else = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
	case *js.DoWhileStmt:
		if re, _ := rewrite(node.Body).(js.IStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
	case *js.WhileStmt:
		if re, _ := rewrite(node.Body).(js.IStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
	case *js.ForStmt:
		if re, _ := rewrite(node.Body).(*js.BlockStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
		if re, _ := rewrite(node.Post).(js.IExpr); re != nil {
			node.Post = re
		}
	case *js.ForInStmt:
		if re, _ := rewrite(node.Body).(*js.BlockStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
	case *js.ForOfStmt:
		if re, _ := rewrite(node.Body).(*js.BlockStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
	case *js.CaseClause:
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
		for i := range node.List {
			if re, _ := rewrite(node.List[i]).(js.IStmt); re != nil {
				node.List[i] = re
			}
		}
	case *js.SwitchStmt:
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.CaseClause); re != nil {
				node.List[i] = *re
			}
		}
	case *js.ReturnStmt:
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
	case *js.WithStmt:
		if re, _ := rewrite(node.Body).(js.IStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
	case *js.LabelledStmt:
		if re, _ := rewrite(node.Value).(js.IStmt); re != nil {
			node.Value = re
		}
	case *js.ThrowStmt:
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
	case *js.TryStmt:
		if re, _ := rewrite(node.Body).(*js.BlockStmt); re != nil {
			node.Body = re
		}
		if re, _ := rewrite(node.Catch).(*js.BlockStmt); re != nil {
			node.Catch = re
		}
		if re, _ := rewrite(node.Finally).(*js.BlockStmt); re != nil {
			node.Finally = re
		}
	case *js.ImportStmt:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.Alias); re != nil {
				node.List[i] = *re
			}
		}
	case *js.ExportStmt:
		if re, _ := rewrite(node.Decl).(js.IExpr); re != nil {
			node.Decl = re
		}
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.Alias); re != nil {
				node.List[i] = *re
			}
		}
	case *js.PropertyName:
		if re, _ := rewrite(node.Computed).(js.IExpr); re != nil {
			node.Computed = re
		}
		if re, _ := rewrite(&node.Literal).(*js.LiteralExpr); re != nil {
			node.Literal = *re
		}
	case *js.BindingArray:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.BindingElement); re != nil {
				node.List[i] = *re
			}
		}
	case *js.BindingObjectItem:
		if re, _ := rewrite(node.Key).(*js.PropertyName); re != nil {
			node.Key = re
		}
		if re, _ := rewrite(&node.Value).(*js.BindingElement); re != nil {
			node.Value = *re
		}
	case *js.BindingObject:
		if re, _ := rewrite(node.Rest).(*js.Var); re != nil {
			node.Rest = re
		}
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.BindingObjectItem); re != nil {
				node.List[i] = *re
			}
		}
	case *js.BindingElement:
		if re, _ := rewrite(node.Default).(js.IExpr); re != nil {
			node.Default = re
		}
	case *js.VarDecl:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.BindingElement); re != nil {
				node.List[i] = *re
			}
		}
	case *js.Params:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.BindingElement); re != nil {
				node.List[i] = *re
			}
		}
	case *js.FuncDecl:
		if re, _ := rewrite(&node.Body).(*js.BlockStmt); re != nil {
			node.Body = *re
		}
		if re, _ := rewrite(node.Name).(*js.Var); re != nil {
			node.Name = re
		}
		for i := range node.Params.List {
			if re, _ := rewrite(&node.Params.List[i]).(*js.BindingElement); re != nil {
				node.Params.List[i] = *re
			}
		}
	case *js.MethodDecl:
		if re, _ := rewrite(&node.Body).(*js.BlockStmt); re != nil {
			node.Body = *re
		}
		if re, _ := rewrite(&node.Name).(*js.PropertyName); re != nil {
			node.Name = *re
		}
		for i := range node.Params.List {
			if re, _ := rewrite(&node.Params.List[i]).(*js.BindingElement); re != nil {
				node.Params.List[i] = *re
			}
		}
	case *js.Field:
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
		if re, _ := rewrite(&node.Name).(*js.PropertyName); re != nil {
			node.Name = *re
		}
	case *js.ClassElement:
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
		if re, _ := rewrite(&node.Name).(*js.PropertyName); re != nil {
			node.Name = *re
		}
		if re, _ := rewrite(node.StaticBlock).(*js.BlockStmt); re != nil {
			node.StaticBlock = re
		}
		if re, _ := rewrite(node.Method).(*js.MethodDecl); re != nil {
			node.Method = re
		}
		if re, _ := rewrite(&node.Field).(*js.Field); re != nil {
			node.Field = *re
		}
	case *js.ClassDecl:
		if re, _ := rewrite(node.Name).(*js.Var); re != nil {
			node.Name = re
		}
		if re, _ := rewrite(node.Extends).(js.IExpr); re != nil {
			node.Extends = re
		}
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.ClassElement); re != nil {
				node.List[i] = *re
			}
		}
	case *js.Element:
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
	case *js.ArrayExpr:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.Element); re != nil {
				node.List[i] = *re
			}
		}
	case *js.Property:
		if re, _ := rewrite(node.Init).(js.IExpr); re != nil {
			node.Init = re
		}
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
		if re, _ := rewrite(node.Name).(*js.PropertyName); re != nil {
			node.Name = re
		}
	case *js.ObjectExpr:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.Property); re != nil {
				node.List[i] = *re
			}
		}
	case *js.TemplatePart:
		if re, _ := rewrite(node.Expr).(js.IExpr); re != nil {
			node.Expr = re
		}
	case *js.TemplateExpr:
		if re, _ := rewrite(node.Tag).(js.IExpr); re != nil {
			node.Tag = re
		}
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.TemplatePart); re != nil {
				node.List[i] = *re
			}
		}
	case *js.GroupExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
	case *js.IndexExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(node.Y).(js.IExpr); re != nil {
			node.Y = re
		}
	case *js.DotExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(&node.Y).(*js.LiteralExpr); re != nil {
			node.Y = *re
		}
	case *js.Arg:
		if re, _ := rewrite(node.Value).(js.IExpr); re != nil {
			node.Value = re
		}
	case *js.Args:
		for i := range node.List {
			if re, _ := rewrite(&node.List[i]).(*js.Arg); re != nil {
				node.List[i] = *re
			}
		}
	case *js.NewExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(node.Args).(*js.Args); re != nil {
			node.Args = re
		}
	case *js.CallExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(&node.Args).(*js.Args); re != nil {
			node.Args = *re
		}
	case *js.UnaryExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
	case *js.BinaryExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(node.Y).(js.IExpr); re != nil {
			node.Y = re
		}
	case *js.CondExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
		if re, _ := rewrite(node.Y).(js.IExpr); re != nil {
			node.Y = re
		}
		if re, _ := rewrite(node.Cond).(js.IExpr); re != nil {
			node.Cond = re
		}
	case *js.YieldExpr:
		if re, _ := rewrite(node.X).(js.IExpr); re != nil {
			node.X = re
		}
	case *js.CommaExpr:
		for i := range node.List {
			if re, _ := rewrite(node.List[i]).(js.IExpr); re != nil {
				node.List[i] = re
			}
		}
	case *js.ArrowFunc:
		if re, _ := rewrite(&node.Body).(*js.BlockStmt); re != nil {
			node.Body = *re
		}
		for i := range node.Params.List {
			if re, _ := rewrite(&node.Params.List[i]).(*js.BindingElement); re != nil {
				node.Params.List[i] = *re
			}
		}
	}
}
