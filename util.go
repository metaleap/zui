package zui

import (
	"cmp"
	"crypto/md5"
	"crypto/sha1"
	"encoding/binary"
	"io/fs"
	"os"
	"sort"
	"strconv"
	"strings"
)

var (
	itoa  = strconv.Itoa
	strQ  = strconv.Quote
	strLo = strings.ToLower
)

func ıf[T any](b bool, t T, f T) T {
	if b {
		return t
	}
	return f
}

func assert(b bool) {
	if !b {
		panic("assertion failure")
	}
}

func ContentHash(content []byte) []byte {
	b1, b2 := sha1.Sum(content), md5.Sum(content)
	return append(b2[:], b1[:]...)
}

func ContentHashStr(content []byte) (s string) {
	hash, sbuf := ContentHash(content), strings.Builder{}
	for (len(hash) % 8) != 0 {
		hash = append(hash, 0)
	}
	for i := 0; i < len(hash); i += 8 {
		_, _ = sbuf.WriteString(strconv.FormatUint(binary.LittleEndian.Uint64(hash[i:i+8]), 36))
	}
	return sbuf.String()
}

func shortenedLen6(zuiFileHash string) string {
	return zuiFileHash[:3] + zuiFileHash[len(zuiFileHash)-3:]
}

func orderedMapKeys[TKey cmp.Ordered, TValue any](m map[TKey]TValue) (ret []TKey) {
	ret = make([]TKey, 0, len(m))
	for k := range m {
		ret = append(ret, k)
	}
	sort.Slice(ret, func(i int, j int) bool {
		return cmp.Less[TKey](ret[i], ret[j])
	})
	return
}

func FsIsDir(dirPath string) bool   { return fsIs(dirPath, fs.FileInfo.IsDir, true) }
func FsIsFile(filePath string) bool { return fsIs(filePath, fs.FileInfo.IsDir, false) }
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

func FsPathSwapExt(filePath string, oldExtInclDot string, newExtInclDot string) string {
	if strings.HasSuffix(filePath, oldExtInclDot) {
		filePath = filePath[:len(filePath)-len(oldExtInclDot)] + newExtInclDot
	}
	return filePath
}
