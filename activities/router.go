package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/go-chi/chi/v5"
)

func SetupActivityRoutes(router chi.Router, db *firestore.Client) {
  c := NewController(db)

  router.Route("/activities", func(r chi.Router) {
    r.Get("/", c.HandleGet)
    r.Get("/webhook", c.HandleWebhookGet)
    r.Post("/webhook", c.HandleWebhookPost)
  })

}
