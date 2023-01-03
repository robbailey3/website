package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
  "github.com/robbailey3/website-api/response"
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
  var request GetActivitiesRequest

  if err := ctx.QueryParser(&request); err != nil {
    return response.BadRequest(ctx, err.Error())
  }

  activities, err := c.service.GetActivities(ctx.Context(), &request)

  if err != nil {
    return response.ServerError(ctx, err)
  }

  return response.Ok(ctx, activities)
}

func (c *controller) HandleGetById(ctx *fiber.Ctx) error {
  id := ctx.Params("id")

  activity, err := c.service.GetActivityById(ctx.Context(), id)

  if err != nil {
    return response.ServerError(ctx, err)
  }

  return response.Ok(ctx, activity)
}

func (c *controller) HandleWebhookGet(ctx *fiber.Ctx) error {
  // TODO implement me
  panic("implement me")
}

func (c *controller) HandleWebhookPost(ctx *fiber.Ctx) error {
  // TODO implement me
  panic("implement me")
}
