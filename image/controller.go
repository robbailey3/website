package image

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
)

type Controller interface {
	Upload(ctx *fiber.Ctx) error
	GetLabels(ctx *fiber.Ctx) error
	GetProperties(ctx *fiber.Ctx) error
	GetLandmarks(ctx *fiber.Ctx) error
	GetFaces(ctx *fiber.Ctx) error
	GetImage(ctx *fiber.Ctx) error
	GetLogos(ctx *fiber.Ctx) error
}

type controller struct {
	service Service
}

func NewController(db *firestore.Client) Controller {
	return &controller{service: NewService(db)}
}

func (c *controller) Upload(ctx *fiber.Ctx) error {
	fileHeader, err := ctx.FormFile("image")

	if err != nil {
		return response.ServerError(ctx, err)
	}

	id, err := c.service.CreateImage(ctx.Context(), fileHeader)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, id)
}

func (c *controller) GetLabels(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	labels, err := c.service.GetImageLabels(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, labels)
}

func (c *controller) GetProperties(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	labels, err := c.service.GetImageProperties(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, labels)
}

func (c *controller) GetLandmarks(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	labels, err := c.service.GetImageLandmarks(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, labels)
}

func (c *controller) GetFaces(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	faces, err := c.service.GetImageFaces(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, faces)
}

func (c *controller) GetImage(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	img, err := c.service.GetImage(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.File(ctx, img)
}

func (c *controller) GetLogos(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	if id == "" {
		return response.BadRequest(ctx, "No id")
	}

	logos, err := c.service.GetImageLogos(ctx.Context(), id)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, logos)
}