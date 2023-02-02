package github

import (
  "github.com/robbailey3/website-api/response"
  "net/http"
  "strconv"
)

func GetRepos(w http.ResponseWriter, req *http.Request) {
  client := NewClient()

  query := req.URL.Query()

  page, err := strconv.Atoi(query.Get("page"))
  if err != nil {
    response.BadRequest(w, "Invalid page")
    return
  }
  perPage, err := strconv.Atoi(query.Get("per_page"))
  if err != nil {
    response.BadRequest(w, "Invalid page")
    return
  }

  request := GetReposRequest{
    Username:  "robbailey3", // Hard code this one for now
    Sort:      query.Get("sort"),
    Direction: query.Get("direction"),
    PerPage:   perPage,
    Page:      page,
  }

  repos, err := client.GetRepositories(request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, repos)
}
