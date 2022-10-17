package image

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
)

func InitImageRoutes(app fiber.Router, db *firestore.Client) {
	controller := NewController(db)

	group := app.Group("image")
	group.Post("", controller.Upload)
	group.Get("/:id/labels", controller.GetLabels)
}
