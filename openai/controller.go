package openai

import (
  "encoding/json"
  "github.com/robbailey3/website-api/response"
  "io"
  "net/http"
)

type Controller interface {
  GetCompletion(w http.ResponseWriter, req *http.Request)
}

type controllerImpl struct {
  client Client
}

func NewController() Controller {
  return &controllerImpl{client: NewClient()}
}

func (c *controllerImpl) GetCompletion(w http.ResponseWriter, req *http.Request) {
  var request CompletionRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.ServerError(w, err)
    return
  }

  completion, err := c.client.GetCompletion(&request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, completion)
}
