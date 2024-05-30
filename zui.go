package zui

import (
	"strings"
)

func FirstLineJS(zuiFileHash string) string {
	return "//" + zuiFileHash + "\n"
}

func ToJS(zuiFileName string, zuiFileSrc string, zuiFileHash string) string {
	var buf strings.Builder
	buf.WriteString(FirstLineJS(zuiFileHash))

	return buf.String()
}
