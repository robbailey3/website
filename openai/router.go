package openai

import (
  "github.com/robbailey3/website-api/secrets"
  "time"

  "github.com/go-chi/chi/v5"
  "github.com/go-chi/httprate"
)

func SetupOpenAiRoutes(router chi.Router, secretsClient secrets.Client) {
  c := NewController(secretsClient)

  router.Route("/openai", func(r chi.Router) {
    r.Use(httprate.LimitByIP(5, 1*time.Minute))
    r.Post("/completions", c.GetCompletion)
    r.Post("/edits", c.GetEdit)
  })
}
