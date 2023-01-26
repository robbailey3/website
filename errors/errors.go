package errors

import (
  "github.com/pkg/errors"
)

type ErrorCode uint8

const (
  ServerError  ErrorCode = 1
  Unauthorized ErrorCode = 2
  BadRequest   ErrorCode = 3
  NotFound     ErrorCode = 4
)

type ApiError struct {
  Cause  error     `json:"-"`
  Detail string    `json:"detail"`
  Status int       `json:"-"`
  Code   ErrorCode `json:"code"`
}

func (a ApiError) Error() string {
  return errors.Cause(a.Cause).Error()
}

func NewApiError(err error, status int, detail string) error {
  return &ApiError{
    Cause:  errors.Wrap(err, detail),
    Detail: detail,
    Status: status,
  }
}
