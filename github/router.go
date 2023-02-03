package github

import (
  "github.com/go-chi/chi/v5"
)

func SetupRoutes(router chi.Router) {
  controller := NewController()
  router.Route("/github", func(r chi.Router) {
    r.Get("/repos", controller.GetRepos)
  })
}
