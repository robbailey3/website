package exception

type NotFoundError struct {
}

func NotFound() *NotFoundError {
	return &NotFoundError{}
}

func (n *NotFoundError) Error() string {
	return ""
}
