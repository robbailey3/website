package server

import (
	"fmt"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"log"
	"os"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
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
	app.Use(limiter.New(limiter.Config{Max: 20, Expiration: time.Minute}))
	app.Use(compress.New())
	app.Use(cors.New(cors.Config{AllowOrigins: "*"}))
	app.Use(requestid.New())
	app.Use(logger.New(
		logger.Config{
			Format:     "[${time}] | ${locals:requestid} | ${status} - ${latency} | ${method} | ${path}\n",
			TimeFormat: "02-01-2006 15:04:05",
		},
	))
	app.Use(recover.New())
	app.Use(cache.New(cache.Config{StoreResponseHeaders: true}))
}

func Init(db *firestore.Client) {
	app := fiber.New(fiber.Config{
		BodyLimit: 20 * 1024 * 1024,
	})

	setupMiddleware(app)

	app.Static("/", "./public")
	app.Static("/assets", "./public/assets")

	setupRoutes(db, app.Group("api"))

	port := getPort()

	log.Println(fmt.Sprintf("starting server on port %s", port))

	log.Fatal(app.Listen(getPort()))
}
