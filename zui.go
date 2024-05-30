package zui

import (
	"strings"

	"golang.org/x/net/html"
)

func FirstLineJS(zuiFileHash string) string {
	return "//" + zuiFileHash + "\n"
}

func ToJS(zuiFileName string, zuiFileSrc string, zuiFileHash string) (string, error) {
	var buf strings.Builder
	buf.WriteString(FirstLineJS(zuiFileHash))

	htm_root, err := html.Parse(strings.NewReader("<html>" + "</html>"))
	if err != nil {
		return "", err
	}
	_ = htm_root

	return buf.String(), err
}
