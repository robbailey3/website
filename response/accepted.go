package response

import (
	"github.com/gofiber/fiber/v2"
	"time"
)

func Accepted(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusAccepted).JSON(struct {
		BaseResponse
	}{
		BaseResponse{
			Success:   true,
			Timestamp: time.Now(),
		},
	})
}
