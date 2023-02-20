package github

import (
  "context"
  "fmt"
  "github.com/gookit/slog"
  "github.com/robbailey3/website-api/hermod"
  "github.com/robbailey3/website-api/secrets"
  "net/http"
  "strconv"
  "time"
)

type ApiClient interface {
  GetRepositories(request GetReposRequest) ([]*Repository, error)
  GetUser(request GetUserRequest) (*User, error)
}

type clientImpl struct {
  urlBase    string
  apiVersion string
  apiKey     string
}

func (c *clientImpl) GetRepositories(request GetReposRequest) ([]*Repository, error) {
  var repositories []*Repository

  err := hermod.New(http.MethodGet, fmt.Sprintf("%s/users/%s/repos", c.urlBase, request.Username)).
    WithQueryParam("sort", request.Sort).
    WithQueryParam("direction", request.Direction).
    WithQueryParam("per_page", strconv.Itoa(request.PerPage)).
    WithQueryParam("page", strconv.Itoa(request.Page)).
    WithHeader("X-GitHub-Api-Version", c.apiVersion).
    WithHeader("Authorization", fmt.Sprint("Bearer ", c.apiKey)).
    Send(&repositories)

  if err != nil {
    return nil, err
  }

  return repositories, nil
}

func (c *clientImpl) GetUser(request GetUserRequest) (*User, error) {
  var user User

  err := hermod.New(http.MethodGet, fmt.Sprintf("%s/users/%s", c.urlBase, request.Username)).
    WithHeader("X-GitHub-Api-Version", c.apiVersion).
    WithHeader("Authorization", fmt.Sprint("Bearer ", c.apiKey)).
    Send(&user)

  if err != nil {
    return nil, err
  }

  return &user, nil
}

func NewApiClient() ApiClient {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
  defer cancel()

  apiKey, err := secrets.GetSecret(ctx, "GH_ACCESS_TOKEN")
  if err != nil {
    slog.Error("Failed to get GitHub Access Token. Err: ", err)
    return nil
  }

  return &clientImpl{
    urlBase:    "https://api.github.com",
    apiVersion: "2022-11-28",
    apiKey:     apiKey,
  }
}
