package tasks

import (
  "github.com/go-chi/chi/v5"
)

func InitTasksRoutes(router chi.Router) {
  controller := NewController()

  router.Route("/tasks", func(r chi.Router) {
    r.Get("/", controller.GetTasks)
    r.Post("/", controller.CreateTask)
    r.Patch("/{id}", controller.UpdateTask)
    r.Delete("/{id}", controller.DeleteTask)
  })
}
