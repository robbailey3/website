package openai

import (
  "bytes"
  "encoding/json"
  "fmt"
  "github.com/robbailey3/website-api/hermod"
  "net/http"
  "os"
)

type Client interface {
  GetCompletion(request *CompletionRequest) (*Completion, error)
}

type clientImpl struct {
  apiKey  string
  urlBase string
}

func (c *clientImpl) GetCompletion(request *CompletionRequest) (*Completion, error) {
  body, err := json.Marshal(request)
  if err != nil {
    return nil, err
  }
  var completion Completion

  err = hermod.New(http.MethodGet, fmt.Sprint(c.urlBase, "/completions")).
    WithBody(bytes.NewReader(body)).
    WithHeader("Authorization", fmt.Sprint("Bearer ", c.apiKey)).
    WithHeader("Content-Type", "application/json").
    Send(&completion)

  if err != nil {
    return nil, err
  }

  return &completion, nil
}

func NewClient() Client {
  return &clientImpl{
    apiKey:  os.Getenv("OPEN_AI_API_KEY"),
    urlBase: "https://api.openai.com/v1",
  }
}
