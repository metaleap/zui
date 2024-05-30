package main

import (
	"io/fs"
	"os"
	"strings"

	"github.com/metaleap/zui"
)

func main() {
	force := (os.Getenv("FORCE") != "")

	fsDirWalk(".", func(fsPath string, fsEntry fs.DirEntry) {
		if (!fsEntry.IsDir()) && strings.HasSuffix(fsPath, ".zui") {
			println(fsPath)
			zui_file_src, zui_file_hash := fsReadTextFile(fsPath, true)

			js_file_path := fsPathSwapExt(fsPath, ".zui", ".js")
			if (!force) && fsIsFile(js_file_path) {
				js_file_src, _ := fsReadTextFile(js_file_path, false)
				if strings.HasPrefix(js_file_src, zui.FirstLineJS(zui_file_hash)) {
					// .js file is already up-to-date wrt the .zui file
					return
				}
			}

			js_file_src, err := zui.ToJS(fsPath, zui_file_src, zui_file_hash)
			if err != nil {
				panic(err)
			}
			fsWriteTextFile(js_file_path, js_file_src)
		}
	})
}
