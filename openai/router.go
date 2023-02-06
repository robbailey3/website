package openai

import (
  "github.com/go-chi/chi/v5"
  "github.com/go-chi/httprate"
  "time"
)

func SetupOpenAiRoutes(router chi.Router) {
  c := NewController()

  router.Route("/openai", func(r chi.Router) {
    r.Use(httprate.LimitByIP(5, 1*time.Minute))
    r.Post("/completions", c.GetCompletion)
    r.Post("/edits", c.GetEdit)
  })
}
