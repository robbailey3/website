package response

import (
  "encoding/json"
  "net/http"
  "time"
)

func Ok(w http.ResponseWriter, data interface{}) {
  resp, err := json.Marshal(&struct {
    BaseResponse
  }{
    BaseResponse: BaseResponse{
      Success:   true,
      Timestamp: time.Now().Unix(),
      Result:    &data,
    },
  })

  if err != nil {
    ServerError(w, err)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  w.Write(resp)
}
