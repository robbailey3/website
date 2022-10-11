package tasks

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
)

type Controller interface {
	GetTasks(ctx *fiber.Ctx) error
	CreateTask(ctx *fiber.Ctx) error
	UpdateTask(ctx *fiber.Ctx) error
	DeleteTask(ctx *fiber.Ctx) error
}

type controller struct {
	service Service
}

func NewController(db *firestore.Client) Controller {
	return &controller{service: NewService(db)}
}

func (c *controller) GetTasks(ctx *fiber.Ctx) error {
	tasks, err := c.service.GetTasks(ctx.Context())

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, tasks)
}

func (c *controller) CreateTask(ctx *fiber.Ctx) error {
	var task Task

	if err := ctx.BodyParser(&task); err != nil {
		return response.BadRequest(ctx, "Unable to parse request")
	}

	// TODO: Validation

	if err := c.service.CreateTask(ctx.Context(), &task); err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Created(ctx)
}

func (c *controller) UpdateTask(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id specified")
	}

	var updateTaskRequest UpdateTaskRequest

	if err := ctx.BodyParser(&updateTaskRequest); err != nil {
		return response.BadRequest(ctx, "Unable to parse request")
	}

	// TODO: Validation

	if err := c.service.UpdateTask(ctx.Context(), id, &updateTaskRequest); err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Accepted(ctx)
}

func (c *controller) DeleteTask(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id specified")
	}

	if err := c.service.DeleteTask(ctx.Context(), id); err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Accepted(ctx)
}
