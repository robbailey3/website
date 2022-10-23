package image

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
)

func InitImageRoutes(app fiber.Router, db *firestore.Client) {
	controller := NewController(db)

	group := app.Group("image")
	group.Post("", controller.Upload)
	group.Get("/:id", controller.GetImage)
	group.Get("/:id/labels", controller.GetLabels)
	group.Get("/:id/properties", controller.GetProperties)
	group.Get("/:id/landmarks", controller.GetLandmarks)
	group.Get("/:id/logos", controller.GetLogos)
}
