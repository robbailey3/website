package response

import (
  "encoding/json"
  "net/http"
  "time"

  "github.com/gookit/slog"
  "github.com/robbailey3/website-api/validation"
)

func ValidationError(w http.ResponseWriter, errors []*validation.ValidationError) {
  bytes, err := json.Marshal(&struct{ BaseResponse }{
    BaseResponse: BaseResponse{
      Timestamp: time.Now().Unix(),
      Error: &ErrorResponse{
        Code:             errors.BadRequest,
        Message:          "Bad Request",
        ValidationErrors: errors,
      },
    },
  })
  if err != nil {
    slog.Error(err)
    return
  }

  w.WriteHeader(http.StatusBadRequest)
  w.Write(bytes)
}
