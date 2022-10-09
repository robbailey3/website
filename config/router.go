package config

import (
	"github.com/gofiber/fiber/v2"
)

func SetupConfigRoutes(router fiber.Router) {
	controller := NewController()

	group := router.Group("config")

	group.Get("firebase", controller.GetFirebaseConfig)
}
