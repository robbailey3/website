package openai

import (
  "github.com/go-chi/chi/v5"
)

func SetupOpenAiRoutes(router chi.Router) {
  c := NewController()

  router.Route("/openai", func(r chi.Router) {
    r.Post("/completions", c.GetCompletion)
  })
}
