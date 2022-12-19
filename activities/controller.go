package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
)

type Controller interface {
  HandleGet(ctx *fiber.Ctx) error
  HandleGetById(ctx *fiber.Ctx) error
  HandleWebhookGet(ctx *fiber.Ctx) error
  HandleWebhookPost(ctx *fiber.Ctx) error
}

type controller struct {
  service Service
}

func NewController(db *firestore.Client) Controller {
  return &controller{service: NewService(db)}
}

func (c *controller) HandleGet(ctx *fiber.Ctx) error {
  return c.service.GetActivities(ctx)
}

func (c *controller) HandleGetById(ctx *fiber.Ctx) error {
  // TODO implement me
  panic("implement me")
}

func (c *controller) HandleWebhookGet(ctx *fiber.Ctx) error {
  // TODO implement me
  panic("implement me")
}

func (c *controller) HandleWebhookPost(ctx *fiber.Ctx) error {
  // TODO implement me
  panic("implement me")
}
