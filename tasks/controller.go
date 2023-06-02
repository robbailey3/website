package tasks

import (
  "encoding/json"
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/response"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "io"
  "net/http"
)

type Controller interface {
  GetTasks(w http.ResponseWriter, req *http.Request)
  CreateTask(w http.ResponseWriter, req *http.Request)
  UpdateTask(w http.ResponseWriter, req *http.Request)
  DeleteTask(w http.ResponseWriter, req *http.Request)
}

type controller struct {
  service Service
}

func NewController() Controller {
  return &controller{service: NewService()}
}

func (c *controller) GetTasks(w http.ResponseWriter, req *http.Request) {
  tasks, err := c.service.GetTasks(req.Context())

  if err != nil {
    response.ServerError(w, err)
  }

  response.Ok(w, tasks)
}

func (c *controller) CreateTask(w http.ResponseWriter, req *http.Request) {
  var task TaskDto

  bodyBytes, err := io.ReadAll(req.Body)
  if err != nil {
    response.BadRequest(w, "Unable to parse request")
    return
  }
  if err := json.Unmarshal(bodyBytes, &task); err != nil {
    response.BadRequest(w, "Unable to parse request")
    return
  }
  // TODO: Validation

  if err := c.service.CreateTask(req.Context(), &task); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Created(w)
}

func (c *controller) UpdateTask(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  var updateTaskRequest UpdateTaskRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    response.BadRequest(w, "Unable to parse request")
    return
  }

  if err := json.Unmarshal(bodyBytes, &updateTaskRequest); err != nil {
    response.BadRequest(w, "Unable to parse request")
    return
  }

  // TODO: Validation
  if err := c.service.UpdateTask(req.Context(), objId, &updateTaskRequest); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}

func (c *controller) DeleteTask(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    response.BadRequest(w, "Invalid id")
    return
  }

  if err := c.service.DeleteTask(req.Context(), objId); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}
