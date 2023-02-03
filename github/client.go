package github

import (
  "encoding/json"
  "fmt"
  "github.com/pkg/errors"
  "io"
  "net/http"
  "os"
  "strconv"
)

type ApiClient interface {
  GetRepositories(request GetReposRequest) ([]*Repository, error)
  GetRepository()
}

type clientImpl struct {
  urlBase    string
  apiVersion string
}

func (c *clientImpl) GetRepositories(request GetReposRequest) ([]*Repository, error) {
  httpClient := http.Client{}

  req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/users/%s/repos", c.urlBase, request.Username), nil)

  if err != nil {
    return nil, err
  }
  query := req.URL.Query()
  query.Set("sort", request.Sort)
  query.Set("direction", request.Direction)
  query.Set("per_page", strconv.Itoa(request.PerPage))
  query.Set("page", strconv.Itoa(request.Page))
  req.URL.RawQuery = query.Encode()

  req.Header.Add("X-GitHub-Api-Version", c.apiVersion)
  req.Header.Add("Authorization", fmt.Sprint("Bearer ", os.Getenv("GH_ACCESS_TOKEN")))

  resp, err := httpClient.Do(req)

  if err != nil {
    return nil, err
  }

  if resp.StatusCode != http.StatusOK {
    return nil, errors.New("HTTP Status did not indicate success")
  }

  respBytes, err := io.ReadAll(resp.Body)

  if err != nil {
    return nil, err
  }
  var repositories []*Repository

  if err := json.Unmarshal(respBytes, &repositories); err != nil {
    return nil, err
  }

  return repositories, nil
}

func (c *clientImpl) GetRepository() {
  // TODO implement me
  panic("implement me")
}

func NewApiClient() ApiClient {
  return &clientImpl{
    urlBase:    "https://api.github.com",
    apiVersion: "2022-11-28",
  }
}
