package response

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/exception"
	"github.com/robbailey3/website-api/validation"
)

func ValidationError(ctx *fiber.Ctx, errors []*validation.ValidationError) error {
	return ctx.Status(fiber.StatusBadRequest).JSON(struct{ BaseResponse }{
		BaseResponse: BaseResponse{
			Timestamp: time.Now().Unix(),
			Error: &ErrorResponse{
				Code:             exception.BAD_REQUEST,
				Message:          "Bad Request",
				ValidationErrors: errors,
			},
		},
	})
}
