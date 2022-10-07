package exception

type ErrorCode uint8

const (
	SERVER_ERROR ErrorCode = 1
	UNAUTHORIZED ErrorCode = 2
	BAD_REQUEST  ErrorCode = 3
)
