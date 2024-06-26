package zui

import (
	"errors"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"

	"github.com/tdewolff/parse/v2"
	"github.com/tdewolff/parse/v2/js"
)

var (
	ZuiJsFilePath string = "./zui.js"
)

func init() {
	if s := os.Getenv("ZUI_JS"); s != "" {
		ZuiJsFilePath = s
	}
}

func FirstLineJS(zuiFilePath string, zuiFileHash string) string {
	return "// Code generated from " + filepath.Base(zuiFilePath) + ". DO NOT EDIT\n// Source file content hash: " + zuiFileHash + "\n"
}

type zui2js struct {
	strings.Builder // our result JS src that we're building

	// init stuff

	zuiFilePath    string
	zuiFileHash    string
	zuiFileIdent   string
	zuiFileSrcOrig string

	// in-flight state

	topLevelDecls         map[string]js.IExpr
	topLevelStmts         []js.IStmt
	topLevelReactiveDecls map[*js.LabelledStmt]js.IExpr
	topLevelReactiveDeps  map[string][]string
	topLevelReactiveStmts map[string][]string
	imports               map[string]string
	attrExports           []string
	idxFn                 int
	idxEl                 int
	blockFnStack          []*blockFnStackItem
	jsFnNameCache         map[string]string
}

func ToJS(zuiFilePath string, zuiFileSrc string, zuiFileHash string) (string, error) {
	me := zui2js{
		zuiFilePath:           zuiFilePath,
		zuiFileHash:           zuiFileHash,
		zuiFileIdent:          shortenedLen6(zuiFileHash),
		zuiFileSrcOrig:        zuiFileSrc,
		topLevelDecls:         map[string]js.IExpr{},
		topLevelReactiveDecls: map[*js.LabelledStmt]js.IExpr{},
		topLevelReactiveDeps:  map[string][]string{},
		topLevelReactiveStmts: map[string][]string{},
		imports:               map[string]string{},
		jsFnNameCache:         map[string]string{},
	}

	src_htm, err := me.htmlFixupSelfClosingZuiTagsPriorToParsing()
	if err != nil {
		return "", err
	}
	src_htm = htmlPreprocessCurlyAttrs(src_htm)
	htm_top_nodes, err := html.ParseFragment(
		strings.NewReader(strTrim(src_htm)),
		&html.Node{
			Type:     html.ElementNode,
			Data:     "html",
			DataAtom: atom.Html,
			Parent: &html.Node{
				Type: html.DoctypeNode,
				Data: "html",
			},
		},
	)
	if err != nil {
		return "", err
	}
	if false {
		for i, htm := range htm_top_nodes {
			println(i, htmlSrc(htm))
		}
	}

	var htm_head, htm_body, htm_script *html.Node
	// find the <head> and <body> first
	for _, node := range htm_top_nodes {
		if node.Type == html.ElementNode && node.Data == "head" {
			htm_head = node
		}
		if node.Type == html.ElementNode && node.Data == "body" {
			htm_body = node
		}
	}
	// now look for the <script> in the <head>
	if htm_head != nil {
		htm_script, err = me.htmlTopLevelScriptElement(htm_head, htm_script)
		if err != nil {
			return "", err
		}
	}
	// also look for the top-level <script> in the <body> (found there instead of <head> if it's placed after other markup but still top-level)
	if htm_body != nil {
		htm_script, err = me.htmlTopLevelScriptElement(htm_body, htm_script)
		if err != nil {
			return "", err
		}
	}

	// initial basic mostly-static JS emits
	zui_file_name := filepath.Base(zuiFilePath)
	newline, zui_class_name := "\n", zui_file_name[:len(zui_file_name)-len(".zui")]
	me.WriteString(FirstLineJS(zuiFilePath, zuiFileHash))
	zuijs_file_path, err := filepath.Rel(filepath.Dir(me.zuiFilePath), ZuiJsFilePath)
	if err != nil {
		return "", err
	}
	me.WriteString(newline + "import { ZuiElement, deepEq, newE, newT } from '" + zuijs_file_path + "';")
	me.WriteString(newline + "export class " + zui_class_name + " extends ZuiElement {")

	// deal with the <script>
	if htm_script != nil && htm_script.FirstChild != nil &&
		htm_script.FirstChild == htm_script.LastChild && htm_script.FirstChild.Type == html.TextNode {
		me.WriteString(newline + newline) // extra new lines because these emits are unindented
		if err = me.htmlWalkScriptTagAndEmitJS(htm_script.FirstChild.Data); err != nil {
			return "", err
		}
		me.WriteString(newline + newline)
	}
	me.WriteString(newline + "  zuiCreateHTMLElements(shadowRoot) {")
	if htm_body != nil {
		me.WriteString(newline + "    const n_shadowRoot = [];")
		if err = me.htmlWalkElemNodeAndEmitJS(htm_body, "shadowRoot"); err != nil {
			return "", err
		}
	}
	me.WriteString(newline + "  }")

	if len(me.attrExports) > 0 {
		me.WriteString(newline + "  static observedAttributes = ['" + strings.Join(me.attrExports, "', '") + "'];")
		me.WriteString(newline + "  attributeChangedCallback(name, vOld, vNew) {")
		me.WriteString(newline + "    this[name] = vNew;")
		me.WriteString(newline + "  }")
	}

	me.WriteString(newline + "  constructor() {")
	me.WriteString(newline + "    super();")
	for _, stmt := range me.topLevelStmts {
		me.WriteString(newline + "    " + jsString(stmt))
	}
	for _, name := range orderedMapKeys(me.topLevelReactiveDeps) {
		for _, dep := range me.topLevelReactiveDeps[name] {
			me.WriteString(newline + "    this.zuiSub('" + dep + "', () => this.zuiOnPropChanged('" + name + "'));")
		}
	}
	for _, src_js := range orderedMapKeys(me.topLevelReactiveStmts) {
		for _, dep := range me.topLevelReactiveStmts[src_js] {
			me.WriteString(newline + "    this.zuiSub('" + dep + "', () => {\n" + src_js + "\n    });")
		}
	}
	me.WriteString(newline + "  }")

	me.WriteString(newline + "  connectedCallback() {")
	if len(me.attrExports) > 0 {
		for _, name := range orderedMapKeys(me.topLevelDecls) {
			if expr := me.topLevelDecls[name]; expr != nil {
				me.WriteString(newline + "    this." + ıf(slices.Contains(me.attrExports, name), "", "#") + name + " = " + jsString(expr) + ";")
			}
		}
	}
	me.WriteString(newline + "    const shadowRoot = this.attachShadow({ mode: 'open' });")
	me.WriteString(newline + "    this.zuiCreateHTMLElements(shadowRoot);")
	me.WriteString(newline + "  }")

	// register the HTML Custom Element
	me.WriteString(newline + newline + "  static ZuiTagName = " + strQ("zui-"+strLo(zui_class_name)+"_"+zuiFileHash) + ";")
	me.WriteString(newline + "}")
	for _, zui_import_name := range orderedMapKeys(me.imports) {
		zui_import_path := me.imports[zui_import_name]
		if filepath.Ext(zui_import_path) == ".zui" {
			zui_import_path = FsPathSwapExt(zui_import_path, ".zui", ".js")
		}
		if filepath.Ext(zui_import_path) == ".js" {
			me.WriteString(newline + "import { " + zui_import_name + " } from '" + zui_import_path + "';")
		} else {
			zui_import_path, err := me.fileRelPath(zui_import_path)
			if err != nil {
				return "", err
			}
			me.WriteString(newline + "const " + zui_import_name + " = " + strQ(zui_import_path) + ";")
		}
	}
	me.WriteString(newline + "customElements.define(" + zui_class_name + ".ZuiTagName, " + zui_class_name + ");")

	return me.String() + newline, err
}

func (me *zui2js) htmlWalkScriptTagAndEmitJS(scriptNodeText string) error {
	js_ast, err := js.Parse(parse.NewInputString(angleBracketSentinelReplUndo.Replace(scriptNodeText)), js.Options{})
	if err != nil {
		return errors.New(me.zuiFilePath + ": " + err.Error())
	}
	if err = jsWalkAndRewriteWholeAST(me, js_ast); err != nil {
		return err
	}

	// capture all top-level decl names first before any emits, because func AST rewrites need them
	for _, stmt := range js_ast.List {
		if export, _ := stmt.(*js.ExportStmt); export != nil {
			if decl, _ := export.Decl.(*js.VarDecl); decl != nil {
				stmt = decl
			} else if decl, _ := export.Decl.(*js.FuncDecl); decl != nil {
				stmt = decl
			}
		}

		switch stmt := stmt.(type) {
		case *js.VarDecl:
			for _, item := range stmt.List {
				assert(item.Binding != nil)
				name := jsString(item.Binding)
				assert(name != "")
				me.topLevelDecls[name] = item.Default
			}
		case *js.FuncDecl:
			assert(stmt.Name != nil)
			name := stmt.Name.String()
			assert(name != "")
			me.topLevelDecls[name] = stmt
		case *js.ImportStmt:
			name, path := strings.Trim(string(stmt.Default), "\"'"), strings.Trim(string(stmt.Module), "\"'")
			assert(name != "" && path != "" && len(stmt.List) == 0)
			me.imports[name] = path
		case *js.LabelledStmt:
			expr, _ := stmt.Value.(*js.ExprStmt)
			var assignment *js.BinaryExpr
			if expr != nil {
				assignment, _ = expr.Value.(*js.BinaryExpr)
			}
			var assignee *js.Var
			if assignment != nil && assignment.Op == js.EqToken {
				assignee, _ = assignment.X.(*js.Var)
			}
			if assignee != nil {
				name := string(assignee.Name())
				assert(name != "")
				me.topLevelReactiveDecls[stmt] = assignment.Y
			}

		default:
			me.topLevelStmts = append(me.topLevelStmts, stmt)
		}
	}

	pref := "\n  "
	// now, emit the top-level decls, rewriting all func ASTs and var-decl initial-value expressions
	for i, stmt := range js_ast.List { // not walking our map, so as to preserve original ordering
		is_exported := false
		if export, _ := stmt.(*js.ExportStmt); export != nil {
			if decl, _ := export.Decl.(*js.VarDecl); decl != nil {
				stmt, is_exported = decl, true
			} else if decl, _ := export.Decl.(*js.FuncDecl); decl != nil {
				stmt, is_exported = decl, true
			}
		}

		switch stmt := stmt.(type) {
		default:
			if _, err = jsWalkAndRewriteTopLevelFuncAST(me, jsString(stmt), stmt); err != nil {
				return err
			}
		case *js.FuncDecl:
			name_orig := stmt.Name.String()
			if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name_orig, &stmt.Body); err != nil {
				return err
			}
			src_fn := jsString(stmt)
			assert(strings.HasPrefix(src_fn, "function "))
			me.WriteString("\n\n" + ıf(is_exported, "", "#") + strTrim(src_fn[len("function "):]) + "\n")
		case *js.VarDecl:
			for _, item := range stmt.List {
				name_orig := jsString(item.Binding)
				name_prop := ıf(is_exported, name_orig, "#"+name_orig)
				name_var := "#v" + itoa(i)
				if is_exported {
					me.attrExports = append(me.attrExports, name_orig)
				}
				{
					me.WriteString(pref + name_var)
					if item.Default != nil {
						if _, err = jsWalkAndRewriteTopLevelFuncAST(me, name_orig, item.Default); err != nil {
							return err
						}
						me.WriteString(" = " + jsString(item.Default))
					}
					me.WriteByte(';')
				}
				me.WriteString(pref + "get " + name_prop + "() { return this." + name_var + "; }")
				me.WriteString(pref + "set " + ıf(stmt.TokenType == js.ConstToken && is_exported, "#", "") + name_prop + "(v) {")
				me.WriteString(pref + "  if (!deepEq(this." + name_var + ", v)) {")
				me.WriteString(pref + "    this." + name_var + " = v;")
				me.WriteString(pref + "    this.zuiOnPropChanged('" + name_orig + "');")
				me.WriteString(pref + "  }")
				me.WriteString(pref + "}")
			}
		case *js.LabelledStmt:
			if expr := me.topLevelReactiveDecls[stmt]; expr != nil {
				name := jsAssigneeNameInLabelledStmt(stmt)
				me.topLevelReactiveDeps[name], err = jsWalkAndRewriteTopLevelFuncAST(me, name, &js.BlockStmt{List: []js.IStmt{&js.ExprStmt{Value: expr}}})
				if err != nil {
					return err
				}
				me.WriteString(pref + "get #" + name + "() { return " + jsString(expr) + " }")
			} else {
				block := js.BlockStmt{List: []js.IStmt{stmt.Value}}
				deps, err := jsWalkAndRewriteTopLevelFuncAST(me, "", &block)
				if err != nil {
					return err
				}
				me.topLevelReactiveStmts[jsString(block.List[0])] = deps
			}
		}
	}
	return nil
}

func (me *zui2js) fileRelPath(filePath string) (string, error) {
	file_path_from_cur_dir_vantage := filepath.Join(filepath.Dir(me.zuiFilePath), filePath)
	file_exists_from_zui_file_vantage := FsIsFile(file_path_from_cur_dir_vantage)
	if file_exists_from_zui_file_vantage {
		return file_path_from_cur_dir_vantage, nil
	} else {
		return "", errors.New(me.zuiFilePath + ": the zuiPath '" + filePath + "' does not exist")
	}
}
