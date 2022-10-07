package photos

import (
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
	"github.com/robbailey3/website-api/slices"
	"github.com/robbailey3/website-api/storage"
	"github.com/robbailey3/website-api/validation"
)

var allowedFileTypes = []string{"image/jpeg"}

type Controller interface {
	UploadPhoto(ctx *fiber.Ctx) error
}

type controller struct {
	service Service
}

func NewController(service Service) Controller {
	return &controller{
		service,
	}
}

func (c *controller) UploadPhoto(ctx *fiber.Ctx) error {
	fileHeader, err := ctx.FormFile("photo")

	if err != nil {
		return response.ServerError(ctx, err)
	}

	fileType := fileHeader.Header.Get("Content-Type")

	if !slices.Contains[string](allowedFileTypes, fileType) {
		return response.BadRequest(ctx, []*validation.ValidationError{})
	}

	file, err := fileHeader.Open()

	if err != nil {
		return response.ServerError(ctx, err)
	}

	client, err := storage.NewClient(ctx.Context(), "rb-website-api-test")

	if err != nil {
		return response.ServerError(ctx, err)
	}

	if err := client.Upload(ctx.Context(), "SOMETHING", file); err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Accepted(ctx)
}
