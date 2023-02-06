package openai

import (
  "encoding/json"
  "github.com/robbailey3/website-api/response"
  "io"
  "net/http"
)

type Controller interface {
  GetCompletion(w http.ResponseWriter, req *http.Request)
  GetEdit(w http.ResponseWriter, req *http.Request)
}

type controllerImpl struct {
  service Service
}

func NewController() Controller {
  return &controllerImpl{service: NewService()}
}

func (c *controllerImpl) GetCompletion(w http.ResponseWriter, req *http.Request) {
  var request GetCompletionRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.ServerError(w, err)
    return
  }

  completion, err := c.service.GetCompletion(&request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, completion)
}

func (c *controllerImpl) GetEdit(w http.ResponseWriter, req *http.Request) {
  var request GetEditRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.ServerError(w, err)
    return
  }

  completion, err := c.service.GetEdit(request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, completion)
}
