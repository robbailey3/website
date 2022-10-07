package response

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/exception"
)

func Unauthorized(ctx *fiber.Ctx, err error) error {
	log.Fatalf("unauthorized: %v\n", err)
	return ctx.Status(fiber.StatusUnauthorized).JSON(struct {
		BaseResponse
	}{
		BaseResponse: BaseResponse{
			Success:   false,
			Timestamp: time.Now().Unix(),
			Error: &ErrorResponse{
				Code:    exception.UNAUTHORIZED,
				Message: "Unauthorized",
			},
		},
	})
}
