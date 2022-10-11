package tasks

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/middleware"
)

func InitTasksRoutes(app fiber.Router, db *firestore.Client) {
	controller := NewController(db)

	group := app.Group("tasks")

	group.Get("", middleware.WithFirebaseAuth, controller.GetTasks)
	group.Post("", middleware.WithFirebaseAuth, controller.CreateTask)
	group.Patch("/:id", middleware.WithFirebaseAuth, controller.UpdateTask)
	group.Delete("/:id", middleware.WithFirebaseAuth, controller.DeleteTask)
}
