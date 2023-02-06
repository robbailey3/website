package openai

import (
  "encoding/json"
  "fmt"
  "github.com/robbailey3/website-api/hermod"
  "net/http"
  "os"
)

type Client interface {
  GetCompletion(request *GetCompletionRequest) (*Completion, error)
  GetEdit(request GetEditRequest) (*Edit, error)
}

type clientImpl struct {
  apiKey  string
  urlBase string
}

func (c *clientImpl) GetCompletion(request *GetCompletionRequest) (*Completion, error) {
  body, err := json.Marshal(request)
  if err != nil {
    return nil, err
  }
  var completion Completion

  err = hermod.New(http.MethodPost, fmt.Sprint(c.urlBase, "/completions")).
    WithBody(body).
    WithHeader("Content-Type", "application/json").
    WithHeader("Authorization", fmt.Sprint("Bearer ", c.apiKey)).
    Send(&completion)

  if err != nil {
    return nil, err
  }

  return &completion, nil
}

func (c *clientImpl) GetEdit(request GetEditRequest) (*Edit, error) {
  body, err := json.Marshal(request)
  if err != nil {
    return nil, err
  }
  var edit Edit

  err = hermod.New(http.MethodPost, fmt.Sprint(c.urlBase, "/edits")).
    WithBody(body).
    WithHeader("Content-Type", "application/json").
    WithHeader("Authorization", fmt.Sprint("Bearer ", c.apiKey)).
    Send(&edit)

  if err != nil {
    return nil, err
  }

  return &edit, nil
}

func NewClient() Client {
  return &clientImpl{
    apiKey:  os.Getenv("OPEN_AI_API_KEY"),
    urlBase: "https://api.openai.com/v1",
  }
}
