package zui

import (
	"crypto/md5"
	"crypto/sha1"
	"encoding/binary"
	"strconv"
	"strings"
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
