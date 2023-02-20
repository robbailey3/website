package activities

import (
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/secrets"
)

func SetupActivityRoutes(router chi.Router, secretsClient secrets.Client) {
  c := NewController(secretsClient)

  router.Route("/activities", func(r chi.Router) {
    r.Get("/", c.HandleGet)
    r.Get("/webhook", c.HandleWebhookGet)
    r.Post("/webhook", c.HandleWebhookPost)
  })

}
