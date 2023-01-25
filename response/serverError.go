package response

import (
  "encoding/json"
  "github.com/getsentry/sentry-go"
  "github.com/gookit/slog"
  "net/http"
  "time"

  "github.com/robbailey3/website-api/exception"
)

func ServerError(w http.ResponseWriter, err error) {
  sentry.CaptureException(err)

  bytes, err := json.Marshal(&struct {
    BaseResponse
  }{
    BaseResponse: BaseResponse{
      Success:   false,
      Timestamp: time.Now().Unix(),
      Error: &ErrorResponse{
        Code:    exception.ServerError,
        Message: "Server error",
      },
    },
  })
  if err != nil {
    slog.Error(err)
    return
  }

  w.WriteHeader(http.StatusInternalServerError)
  w.Write(bytes)
}
