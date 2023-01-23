package blog

import (
  "encoding/json"
  "github.com/robbailey3/website-api/exception"
  "github.com/robbailey3/website-api/validation"
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
    return
  }

  offset, err := strconv.Atoi(req.URL.Query().Get("offset"))

  if err != nil {
    response.BadRequest(w, "failed to parse offset")
    return
  }

  posts, err := c.service.GetPosts(req.Context(), limit, offset)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, posts)
}

func (c *controller) GetPost(w http.ResponseWriter, req *http.Request) {
  id, err := strconv.ParseInt(chi.URLParam(req, "id"), 10, 64)

  if err != nil {
    response.BadRequest(w, "Bad id")
    return
  }

  if id == 0 {
    response.BadRequest(w, "No id")
    return
  }

  posts, err := c.service.GetPost(req.Context(), id)

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
  var request AddPostRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    response.BadRequest(w, "failed to parse request")
    return
  }

  if err := validation.Validate(&request); err != nil {
    response.ValidationError(w, err)
    return
  }

  if err := c.service.AddPost(req.Context(), &request); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Created(w)
}

func (c *controller) UpdatePost(w http.ResponseWriter, req *http.Request) {
  var request UpdatePostRequest

  if req.Body == nil {
    response.BadRequest(w, "request contained no body")
    return
  }

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

  if err := validation.Validate(&request); err != nil {
    response.ValidationError(w, err)
    return
  }

  id, err := strconv.ParseInt(chi.URLParam(req, "id"), 10, 64)

  if err != nil {
    response.BadRequest(w, "Bad id")
    return
  }

  if id == 0 {
    response.BadRequest(w, "No id")
    return
  }

  if err := c.service.UpdatePost(req.Context(), id, &request); err != nil {
    if _, ok := err.(*exception.NotFoundError); ok {
      response.NotFound(w)
      return
    }

    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}

func (c *controller) DeletePost(w http.ResponseWriter, req *http.Request) {
  id, err := strconv.ParseInt(chi.URLParam(req, "id"), 10, 64)

  if err != nil {
    response.BadRequest(w, "Bad id")
    return
  }

  if id == 0 {
    response.BadRequest(w, "No id")
    return
  }

  if err := c.service.DeletePost(req.Context(), id); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}
