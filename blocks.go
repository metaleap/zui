package zui

import (
	"strings"
)

func htmlPreprocessAndRewriteBlocks(src string) string {
	var buf strings.Builder
	for {
		idx_close := strings.IndexByte(src, '}')
		if idx_close < 0 {
			buf.WriteString(src)
			break
		}
		idx_open := strings.LastIndexByte(src[:idx_close], '{')
		if idx_open < 0 {
			buf.WriteString(src)
			break
		}
		buf.WriteString(src[:idx_open])
		cur := src[idx_open : idx_close+1]
		src = src[idx_close+1:]

		_ = cur
	}
	return src
}
