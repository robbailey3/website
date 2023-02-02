package github

import (
  "github.com/go-chi/chi/v5"
)

func SetupRoutes(router chi.Router) {
  router.Route("/github", func(r chi.Router) {
    r.Get("/repos", GetRepos)
  })
}
