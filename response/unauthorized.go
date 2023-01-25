package response

import (
  "encoding/json"
  "github.com/gookit/slog"
  "net/http"
  "time"

  "github.com/robbailey3/website-api/exception"
)

func Unauthorized(w http.ResponseWriter, err error) {
  bytes, err := json.Marshal(&struct {
    BaseResponse
  }{
    BaseResponse: BaseResponse{
      Success:   false,
      Timestamp: time.Now().Unix(),
      Error: &ErrorResponse{
        Code:    exception.Unauthorized,
        Message: "Unauthorized",
      },
    },
  })
  if err != nil {
    slog.Error(err)
    return
  }

  w.WriteHeader(http.StatusUnauthorized)
  w.Write(bytes)
}
