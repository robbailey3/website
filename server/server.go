package server

import (
	"cloud.google.com/go/firestore"
	"fmt"
	"github.com/robbailey3/website-api/blog"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
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
	// app.Use(cache.New())
	app.Use(compress.New())
	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(recover.New())
}

func setupRoutes(db *firestore.Client, app fiber.Router) {
	blog.SetupBlogRoutes(db, app)
}

func Init(db *firestore.Client) {
	app := fiber.New()

	setupMiddleware(app)

	app.Static("/", "./public")
	app.Static("/assets", "./public/assets")

	setupRoutes(db, app.Group("api"))

	log.Fatal(app.Listen(getPort()))
}
