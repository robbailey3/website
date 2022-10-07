package response

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/exception"
)

func ServerError(ctx *fiber.Ctx, err error) error {
	log.Fatalf("internal server error: %v\n", err)
	return ctx.Status(fiber.StatusInternalServerError).JSON(struct {
		BaseResponse
	}{
		BaseResponse: BaseResponse{
			Success:   false,
			Timestamp: time.Now().Unix(),
			Error: &ErrorResponse{
				Code:    exception.SERVER_ERROR,
				Message: "Server error",
			},
		},
	})
}
