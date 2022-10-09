package response

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

func Created(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusCreated).JSON(struct {
		BaseResponse
	}{
		BaseResponse{
			Success:   true,
			Timestamp: time.Now().Unix(),
		},
	})
}
