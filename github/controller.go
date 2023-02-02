package github

import (
  "github.com/robbailey3/website-api/response"
  "net/http"
)

func GetRepos(w http.ResponseWriter, req *http.Request) {
  client := NewClient()

  repos, err := client.GetRepositories("robbailey3")

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, repos)
}