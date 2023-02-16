package github

import (
  "fmt"
  "github.com/robbailey3/website-api/hermod"
  "net/http"
  "os"
  "strconv"
)

type ApiClient interface {
  GetRepositories(request GetReposRequest) ([]*Repository, error)
  GetUser(request GetUserRequest) (*User, error)
}

type clientImpl struct {
  urlBase    string
  apiVersion string
}

func (c *clientImpl) GetRepositories(request GetReposRequest) ([]*Repository, error) {
  var repositories []*Repository

  err := hermod.New(http.MethodGet, fmt.Sprintf("%s/users/%s/repos", c.urlBase, request.Username)).
    WithQueryParam("sort", request.Sort).
    WithQueryParam("direction", request.Direction).
    WithQueryParam("per_page", strconv.Itoa(request.PerPage)).
    WithQueryParam("page", strconv.Itoa(request.Page)).
    WithHeader("X-GitHub-Api-Version", c.apiVersion).
    WithHeader("Authorization", fmt.Sprint("Bearer ", os.Getenv("GH_ACCESS_TOKEN"))).
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
    WithHeader("Authorization", fmt.Sprint("Bearer ", os.Getenv("GH_ACCESS_TOKEN"))).
    Send(&user)

  if err != nil {
    return nil, err
  }

  return &user, nil
}

func NewApiClient() ApiClient {
  return &clientImpl{
    urlBase:    "https://api.github.com",
    apiVersion: "2022-11-28",
  }
}
