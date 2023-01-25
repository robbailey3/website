package response

import (
  "encoding/json"
  "net/http"
  "time"

  "github.com/robbailey3/website-api/exception"
)

func BadRequest(w http.ResponseWriter, msg string) {
  resp, err := json.Marshal(&struct{ BaseResponse }{
    BaseResponse: BaseResponse{
      Timestamp: time.Now().Unix(),
      Error: &ErrorResponse{
        Code:    exception.BadRequest,
        Message: msg,
      },
    },
  })

  if err != nil {
    ServerError(w, err)
    return
  }

  w.WriteHeader(http.StatusBadRequest)
  w.Write(resp)
}
