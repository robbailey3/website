package image

import (
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/response"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "net/http"
)

type Controller interface {
  Upload(w http.ResponseWriter, req *http.Request)
  GetLabels(w http.ResponseWriter, req *http.Request)
  GetProperties(w http.ResponseWriter, req *http.Request)
  GetLandmarks(w http.ResponseWriter, req *http.Request)
  GetFaces(w http.ResponseWriter, req *http.Request)
  GetImage(w http.ResponseWriter, req *http.Request)
  GetLogos(w http.ResponseWriter, req *http.Request)
}

type controller struct {
  service Service
}

func NewController() Controller {
  return &controller{service: NewService()}
}

func (c *controller) Upload(w http.ResponseWriter, req *http.Request) {
  _, fileHeader, err := req.FormFile("image")

  if err != nil {
    response.ServerError(w, err)
    return
  }

  id, err := c.service.CreateImage(req.Context(), fileHeader)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, id)
}

func (c *controller) GetLabels(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  labels, err := c.service.GetImageLabels(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, labels)
}

func (c *controller) GetProperties(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  labels, err := c.service.GetImageProperties(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, labels)
}

func (c *controller) GetLandmarks(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  labels, err := c.service.GetImageLandmarks(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, labels)
}

func (c *controller) GetFaces(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  faces, err := c.service.GetImageFaces(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, faces)
}

func (c *controller) GetImage(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  img, err := c.service.GetImage(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.File(w, img)
}

func (c *controller) GetLogos(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  logos, err := c.service.GetImageLogos(req.Context(), objId)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, logos)
}
