package response

import (
  "encoding/json"
  "github.com/robbailey3/website-api/exception"
  "net/http"
  "time"
)

func NotFound(w http.ResponseWriter) {
  resp, err := json.Marshal(&struct{ BaseResponse }{
    BaseResponse{
      Success:   false,
      Timestamp: time.Now().Unix(),
      Error:     &ErrorResponse{Code: exception.NOT_FOUND, Message: "Not found"},
    },
  })

  if err != nil {
    ServerError(w, err)
    return
  }

  w.WriteHeader(http.StatusNotFound)
  w.Write(resp)
}
