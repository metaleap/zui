package zui

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
