package blog

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
)

type Controller interface {
	GetPosts(ctx *fiber.Ctx) error
	GetPost(ctx *fiber.Ctx) error
	AddPost(ctx *fiber.Ctx) error
	UpdatePost(ctx *fiber.Ctx) error
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

}
