package openai

import (
  "context"
  "encoding/json"
  "fmt"
  "github.com/gookit/slog"
  "github.com/robbailey3/website-api/hermod"
  "github.com/robbailey3/website-api/secrets"
  "net/http"
  "time"
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
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
  defer cancel()

  apiKey, err := secrets.GetSecret(ctx, "OPEN_AI_API_KEY")
  if err != nil {
    slog.Error("Failed to get Open AI Api Key. Err: ", err)
    return nil
  }
  return &clientImpl{
    apiKey:  apiKey,
    urlBase: "https://api.openai.com/v1",
  }
}
