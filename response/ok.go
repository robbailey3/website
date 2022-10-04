package response

import (
	"github.com/gofiber/fiber/v2"
	"time"
)

func Ok(ctx *fiber.Ctx, data interface{}) error {
	return ctx.Status(fiber.StatusOK).JSON(struct {
		BaseResponse
	}{
		BaseResponse: BaseResponse{
			Success:   true,
			Timestamp: time.Now(),
			Result:    &data,
		},
	})
}

func OkWithPagination(ctx *fiber.Ctx, data interface{}, currentPage, itemsPerPage, currentItems, totalItems int) error {
	return ctx.Status(fiber.StatusOK).JSON(struct {
		BaseResponse
	}{
		BaseResponse{
			Success:   true,
			Result:    data,
			Timestamp: time.Now(),
			Pagination: &Pagination{
				currentPage,
				itemsPerPage,
				currentItems,
				totalItems,
			},
		},
	})
}
