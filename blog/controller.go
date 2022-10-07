package blog

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
	"github.com/robbailey3/website-api/validation"
)

type Controller interface {
	GetPosts(ctx *fiber.Ctx) error
	GetPost(ctx *fiber.Ctx) error
	AddPost(ctx *fiber.Ctx) error
	UpdatePost(ctx *fiber.Ctx) error
	DeletePost(ctx *fiber.Ctx) error
}

type controller struct {
	service Service
}

func NewController(service Service) Controller {
	return &controller{
		service,
	}
}

func (c *controller) GetPosts(ctx *fiber.Ctx) error {
	posts, err := c.service.GetPosts(ctx)

	if err != nil {
		log.Println(err.Error())
		return ctx.Status(fiber.StatusInternalServerError).SendString("Something went wrong")
	}

	return response.Ok(ctx, posts)
}

func (c *controller) GetPost(ctx *fiber.Ctx) error {
	posts, err := c.service.GetPost(ctx)

	if err != nil {
		log.Println(err.Error())
		return ctx.Status(fiber.StatusInternalServerError).SendString("Something went wrong")
	}

	return response.Ok(ctx, posts)
}

func (c *controller) AddPost(ctx *fiber.Ctx) error {
	if err := c.service.InsertPost(ctx); err != nil {
		return err
	}

	return response.Accepted(ctx)
}

func (c *controller) UpdatePost(ctx *fiber.Ctx) error {
	var updateRequest UpdatePostRequest
	err := ctx.BodyParser(&updateRequest)

	if err != nil {
		return response.BadRequest(ctx, []*validation.ValidationError{})
	}

	validationErrors := validation.Validate(updateRequest)

	if len(validationErrors) > 0 {
		return response.BadRequest(ctx, validationErrors)
	}

	return nil
}

func (c *controller) DeletePost(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if err := c.service.DeletePost(ctx.Context(), id); err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Accepted(ctx)
}
