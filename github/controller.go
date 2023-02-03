package github

import (
  "github.com/robbailey3/website-api/response"
  "net/http"
  "strconv"
)

type Controller interface {
  GetRepos(w http.ResponseWriter, req *http.Request)
}

type controllerImpl struct {
  service Service
}

func NewController() Controller {
  return &controllerImpl{service: NewService()}
}

func (c *controllerImpl) GetRepos(w http.ResponseWriter, req *http.Request) {
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

  repos, err := c.service.GetRepos(request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, repos)
}
