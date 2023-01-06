package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
  "github.com/robbailey3/website-api/middleware"
)

func SetupActivityRoutes(router fiber.Router, db *firestore.Client) {
  c := NewController(db)

  group := router.Group("activities")

  group.Get("", middleware.UseQueryValidation[GetActivitiesRequest], c.HandleGet)
  group.Get("webhook", c.HandleWebhookGet)
}
