package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
)

func SetupActivityRoutes(router fiber.Router, db *firestore.Client) {
  c := NewController(db)

  group := router.Group("activities")

  group.Get("", c.HandleGet)
}
