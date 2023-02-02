package github

import (
  "encoding/json"
  "fmt"
  "github.com/pkg/errors"
  "io"
  "net/http"
  "os"
)

type Client interface {
  GetRepositories(username string) ([]*RepositoryViewModel, error)
  GetRepository()
}

type clientImpl struct {
  urlBase    string
  apiVersion string
}

func (c *clientImpl) GetRepositories(username string) ([]*RepositoryViewModel, error) {
  httpClient := http.Client{}

  request, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/users/%s/repos", c.urlBase, username), nil)

  if err != nil {
    return nil, err
  }

  request.Header.Add("X-GitHub-Api-Version", c.apiVersion)
  request.Header.Add("Authorization", fmt.Sprint("Bearer ", os.Getenv("GH_ACCESS_TOKEN")))

  resp, err := httpClient.Do(request)

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
  var repositories []Repository

  if err := json.Unmarshal(respBytes, &repositories); err != nil {
    return nil, err
  }

  var repoViewModels []*RepositoryViewModel

  for _, repo := range repositories {
    repoViewModels = append(repoViewModels, repo.ToViewModel())
  }

  return repoViewModels, nil
}

func (c *clientImpl) GetRepository() {
  // TODO implement me
  panic("implement me")
}

func NewClient() Client {
  return &clientImpl{
    urlBase:    "https://api.github.com",
    apiVersion: "2022-11-28",
  }
}
