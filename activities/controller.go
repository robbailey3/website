package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
  "github.com/gookit/slog"
  "github.com/robbailey3/website-api/response"
  "log"
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
  service, err := NewService(db)
  if err != nil {
    // TODO: Handle this error better
    log.Println(err)
  }
  return &controller{service}
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
  webhookQuery := WebhookChallengeRequest{
    HubChallenge: ctx.Query("hub.challenge"),
    HubMode:      ctx.Query("hub.mode"),
    HubVerify:    ctx.Query("hub.verify_token"),
  }
  if !c.service.VerifyWebhook(webhookQuery) {
    return ctx.SendStatus(fiber.StatusBadRequest)
  }

  return ctx.JSON(VerifyWebhookResponse{
    HubChallenge: webhookQuery.HubChallenge,
  })
}

func (c *controller) HandleWebhookPost(ctx *fiber.Ctx) error {
  var request WebhookPostRequest

  if err := ctx.BodyParser(&request); err != nil {
    return ctx.SendStatus(fiber.StatusBadRequest)
  }

  if request.ObjectType != "activity" {
    slog.Warn("Strava webhook request received for non-activity")
    return ctx.SendStatus(fiber.StatusOK)
  }

  if err := c.service.GetNewActivity(ctx.Context(), request.ObjectId); err != nil {
    slog.Error(err)
    return ctx.SendStatus(fiber.StatusInternalServerError)
  }

  return ctx.SendStatus(fiber.StatusOK)
}
