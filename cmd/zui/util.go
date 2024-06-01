package main

import (
	"io/fs"
	"os"
	"path/filepath"

	"github.com/metaleap/zui"
)

func ıf[T any](b bool, t T, f T) T {
	if b {
		return t
	}
	return f
}

func fsDirWalk(dirPath string, onDirEntry func(fsPath string, fsEntry fs.DirEntry)) {
	if err := fs.WalkDir(os.DirFS(dirPath), ".", func(path string, dirEntry fs.DirEntry, err error) error {
		if err != nil {
			panic(err)
		}
		fs_path := filepath.Join(dirPath, path)
		if fs_path != dirPath { // dont want that DirEntry with .Name()=="." in *our* walks
			onDirEntry(fs_path, dirEntry)
		}
		return nil
	}); err != nil {
		panic(err)
	}
}

func fsReadTextFile(filePath string, computeContentHash bool) (string, string) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		panic(err)
	}
	content_hash := ""
	if computeContentHash {
		content_hash = zui.ContentHashStr(data)
	}
	return string(data), content_hash
}

func fsWriteTextFile(filePath string, data string) {
	err := os.WriteFile(filePath, []byte(data), os.ModePerm)
	if err != nil {
		panic(err)
	}
}

func fsGlob(dirPath string, pattern string) []string {
	matches, err := fs.Glob(os.DirFS(dirPath), pattern)
	if err != nil {
		panic(err)
	}
	for i := 0; i < len(matches); i++ {
		matches[i] = filepath.Join(dirPath, matches[i])
	}
	return matches
}
