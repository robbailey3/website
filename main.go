package main

import (
  "fmt"
  "log"
  "os"

  "github.com/gofiber/fiber/v2"
)

func getPort() string {
  port := os.Getenv("PORT")
  if port == "" {
    port = "8080"
  }
  return fmt.Sprintf(":%s", port)
}

func main() {
  app := fiber.New()

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
