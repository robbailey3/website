package blog

import (
  "encoding/json"
  "github.com/robbailey3/website-api/exception"
  "io"
  "net/http"
  "strconv"

  "github.com/go-chi/chi/v5"
  "github.com/gookit/slog"

  "github.com/robbailey3/website-api/response"
)

type Controller interface {
  GetPosts(w http.ResponseWriter, req *http.Request)
  GetPost(w http.ResponseWriter, req *http.Request)
  AddPost(w http.ResponseWriter, req *http.Request)
  UpdatePost(w http.ResponseWriter, req *http.Request)
  DeletePost(w http.ResponseWriter, req *http.Request)
}

type controller struct {
  service Service
}

func NewController(service Service) Controller {
  return &controller{
    service,
  }
}

func (c *controller) GetPosts(w http.ResponseWriter, req *http.Request) {
  limit, err := strconv.Atoi(req.URL.Query().Get("limit"))

  if err != nil {
    response.BadRequest(w, "failed to parse limit")
  }

  offset, err := strconv.Atoi(req.URL.Query().Get("offset"))

  if err != nil {
    response.BadRequest(w, "failed to parse offset")
  }

  posts, err := c.service.GetPosts(req.Context(), limit, offset)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, posts)
}

func (c *controller) GetPost(w http.ResponseWriter, req *http.Request) {
  posts, err := c.service.GetPost(req.Context(), chi.URLParam(req, "id"))

  if err != nil {
    slog.Println(err.Error())
    if _, ok := err.(*exception.NotFoundError); ok {
      response.NotFound(w)
      return
    }
    response.ServerError(w, err)
    return
  }

  response.Ok(w, posts)
}

func (c *controller) AddPost(w http.ResponseWriter, req *http.Request) {
  var request InsertPostRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err := c.service.InsertPost(req.Context(), &request); err != nil {
    response.ServerError(w, err)
  }

  response.Accepted(w)
}

func (c *controller) UpdatePost(w http.ResponseWriter, req *http.Request) {
  var request UpdatePostRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err != nil {
    response.BadRequest(w, "Failed to parse request")
    return
  }

  if err := c.service.UpdatePost(req.Context(), chi.URLParam(req, "id"), request); err != nil {
    response.ServerError(w, err)
    return
  }
}

func (c *controller) DeletePost(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  if err := c.service.DeletePost(req.Context(), id); err != nil {
    response.ServerError(w, err)
  }

  response.Accepted(w)
}
