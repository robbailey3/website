package blog

import (
  "github.com/go-chi/chi/v5"
  "log"
  "net/http"

  "github.com/gofiber/fiber/v2"
  "github.com/robbailey3/website-api/response"
  "github.com/robbailey3/website-api/validation"
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
  posts, err := c.service.GetPosts(req.Context())

  if err != nil {
    log.Println(err.Error())
    response.ServerError(w, err)
    return
  }

  return response.Ok(ctx, posts)
}

func (c *controller) GetPost(w http.ResponseWriter, req *http.Request) {
  posts, err := c.service.GetPost(ctx)

  if err != nil {
    log.Println(err.Error())
    return ctx.Status(fiber.StatusInternalServerError).SendString("Something went wrong")
  }

  return response.Ok(ctx, posts)
}

func (c *controller) AddPost(w http.ResponseWriter, req *http.Request) {
  if err := c.service.InsertPost(ctx); err != nil {
    return err
  }

  return response.Accepted(ctx)
}

func (c *controller) UpdatePost(w http.ResponseWriter, req *http.Request) {
  var updateRequest UpdatePostRequest
  err := ctx.BodyParser(&updateRequest)

  if err != nil {
    response.BadRequest(w, "Failed to parse request")
    return
  }

  validationErrors := validation.Validate(updateRequest)

  if len(validationErrors) > 0 {
    response.ValidationError(w, validationErrors)
    return
  }

  return nil
}

func (c *controller) DeletePost(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  if err := c.service.DeletePost(req.Context(), id); err != nil {
    response.ServerError(w, err)
  }

  response.Accepted(w)
}
