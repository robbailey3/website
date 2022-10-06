package response

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

func Accepted(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusAccepted).JSON(struct {
		BaseResponse
	}{
		BaseResponse{
			Success:   true,
			Timestamp: time.Now().Unix(),
		},
	})
}
