package tasks

import (
  "cloud.google.com/go/firestore"
  "encoding/json"
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/response"
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

func NewController(db *firestore.Client) Controller {
  return &controller{service: NewService(db)}
}

func (c *controller) GetTasks(w http.ResponseWriter, req *http.Request) {
  tasks, err := c.service.GetTasks(req.Context())

  if err != nil {
    response.ServerError(w, err)
  }

  response.Ok(w, tasks)
}

func (c *controller) CreateTask(w http.ResponseWriter, req *http.Request) {
  var task Task

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

  if id == "" {
    response.BadRequest(w, "No id specified")
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
  if err := c.service.UpdateTask(req.Context(), id, &updateTaskRequest); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}

func (c *controller) DeleteTask(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  if id == "" {
    response.BadRequest(w, "No id specified")
    return
  }

  if err := c.service.DeleteTask(req.Context(), id); err != nil {
    response.ServerError(w, err)
    return
  }

  response.Accepted(w)
}
