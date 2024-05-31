package main

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"

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

func fsIsDir(dirPath string) bool   { return fsIs(dirPath, fs.FileInfo.IsDir, true) }
func fsIsFile(filePath string) bool { return fsIs(filePath, fs.FileInfo.IsDir, false) }

func fsIs(path string, check func(fs.FileInfo) bool, expect bool) bool {
	fs_info := fsStat(path)
	return (fs_info != nil) && (expect == check(fs_info))
}

func fsStat(path string) fs.FileInfo {
	fs_info, err := os.Stat(path)
	is_not_exist := os.IsNotExist(err)
	if err != nil && !is_not_exist {
		panic(err)
	}
	return ıf(is_not_exist, nil, fs_info)
}

func fsPathSwapExt(filePath string, oldExtInclDot string, newExtInclDot string) string {
	if strings.HasSuffix(filePath, oldExtInclDot) {
		filePath = filePath[:len(filePath)-len(oldExtInclDot)] + newExtInclDot
	}
	return filePath
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
