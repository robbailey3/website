package server

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return fmt.Sprintf(":%s", port)
}

func setupMiddleware(app *fiber.App) {
	app.Get("/metrics", monitor.New(monitor.Config{Title: "Monitoring"}))
	app.Use(cache.New())
	app.Use(compress.New())
	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(recover.New())
}

func Init() {
	app := fiber.New()

	setupMiddleware(app)

	app.Static("/", "./public")
	app.Static("/assets", "./public/assets")

	app.Get("/", func(c *fiber.Ctx) error {
		name := c.Query("name")
		if name != "" {
			return c.SendString(name)
		}
		return c.SendString("Hello, World!")
	})

	log.Fatal(app.Listen(getPort()))
}
