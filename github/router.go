package github

import (
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/secrets"
)

func SetupRoutes(router chi.Router, secretsClient secrets.Client) {
  controller := NewController(secretsClient)
  router.Route("/github", func(r chi.Router) {
    r.Get("/repos", controller.GetRepos)
    r.Get("/user", controller.GetUser)
  })
}
