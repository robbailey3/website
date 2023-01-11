package response

import (
  "encoding/json"
  "net/http"
  "time"
)

func Accepted(w http.ResponseWriter) {
  resp, err := json.Marshal(&struct{ BaseResponse }{
    BaseResponse{
      Success:   true,
      Timestamp: time.Now().Unix(),
    },
  })

  if err != nil {
    ServerError(w, err)
    return
  }

  w.WriteHeader(http.StatusAccepted)
  w.Write(resp)
}
