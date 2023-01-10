package config

import (
  "github.com/go-chi/chi/v5"
)

func SetupConfigRoutes(router chi.Router) {
  c := NewController()

  router.Route("/config", func(r chi.Router) {
    r.Get("/firebase", c.GetFirebaseConfig)
  })
}
