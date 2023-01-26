package response

import (
  "encoding/json"
  "net/http"
  "time"
)

func BadRequest(w http.ResponseWriter, msg string) {
  resp, err := json.Marshal(&struct{ BaseResponse }{
    BaseResponse: BaseResponse{
      Timestamp: time.Now().Unix(),
      Error: &ErrorResponse{
        Code:    errors.BadRequest,
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
