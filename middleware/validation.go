package middleware

import (
  "net/http"
)

type ErrorResponse struct {
  FailedField string
  Tag         string
  Value       string
}

func UseBodyValidation[T any](w http.ResponseWriter, req *http.Request) {
  // TODO
}

func UseQueryValidation[T any](w http.ResponseWriter, req *http.Request) {
  // TODO
}
