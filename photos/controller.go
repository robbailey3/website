package photos

import (
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/image"
	"github.com/robbailey3/website-api/response"
	"github.com/robbailey3/website-api/validation"
)

type Controller interface {
	GetPhotos(ctx *fiber.Ctx) error
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

func (c *controller) GetPhotos(ctx *fiber.Ctx) error {
	var req GetPhotosRequest

	err := ctx.QueryParser(&req)

	if err != nil {
		return response.BadRequest(ctx, "Failed to parse query")
	}

	errs := validation.Validate(req)

	if errs != nil {
		return response.ValidationError(ctx, errs)
	}

	photos, err := c.service.GetPhotos(ctx.Context(), &req)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	return response.Ok(ctx, photos)
}

func (c *controller) UploadPhoto(ctx *fiber.Ctx) error {
	fileHeader, err := ctx.FormFile("photo")

	if err != nil {
		return response.ServerError(ctx, err)
	}

	if !c.service.IsValidType(fileHeader) {
		return response.BadRequest(ctx, "Invalid file type")
	}

	if !c.service.IsValidSize(fileHeader) {
		return response.BadRequest(ctx, "Invalid file size")
	}

	file, err := fileHeader.Open()

	if err != nil {
		return response.ServerError(ctx, err)
	}

	// client, err := storage.NewClient(ctx.Context(), os.Getenv("PHOTO_BUCKET_NAME"))
	//
	// if err != nil {
	// 	return response.ServerError(ctx, err)
	// }

	aiClient, err := image.NewVisionClient()

	if err != nil {
		return response.ServerError(ctx, err)
	}

	res, err := aiClient.DetectProperties(ctx.Context(), file)

	if err != nil {
		return response.ServerError(ctx, err)
	}

	// if err := client.Upload(ctx.Context(), fileHeader.Filename, file); err != nil {
	// 	return response.ServerError(ctx, err)
	// }

	return response.Ok(ctx, res)
}
