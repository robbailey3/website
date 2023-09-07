package github

import (
	"net/http"
	"strconv"

	"github.com/robbailey3/website-api/response"
)

type Controller interface {
	GetRepos(w http.ResponseWriter, req *http.Request)
	GetUser(w http.ResponseWriter, req *http.Request)
}

type controllerImpl struct {
	service Service
}

func NewController() Controller {
	return &controllerImpl{service: NewService()}
}

func (c *controllerImpl) GetRepos(w http.ResponseWriter, req *http.Request) {
	query := req.URL.Query()

	username := query.Get("username")

	if username == "" {
		username = "robbailey3" // Default to me
	}

	page, err := strconv.Atoi(query.Get("page"))
	if err != nil {
		page = 1
	}
	perPage, err := strconv.Atoi(query.Get("per_page"))
	if err != nil {
		perPage = 30
	}

	request := GetReposRequest{
		Username:  username,
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

func (c *controllerImpl) GetUser(w http.ResponseWriter, req *http.Request) {
	query := req.URL.Query()

	username := query.Get("username")

	if username == "" {
		username = "robbailey3" // Default to me
	}

	request := GetUserRequest{
		Username: username,
	}

	user, err := c.service.GetUser(request)

	if err != nil {
		response.ServerError(w, err)
		return
	}

	response.Ok(w, user)
}
