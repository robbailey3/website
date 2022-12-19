package server

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
  "github.com/robbailey3/website-api/activities"
  "github.com/robbailey3/website-api/blog"
  "github.com/robbailey3/website-api/config"
  "github.com/robbailey3/website-api/image"
  "github.com/robbailey3/website-api/photos"
  "github.com/robbailey3/website-api/tasks"
)

func setupRoutes(db *firestore.Client, app fiber.Router) {
  // TODO: Standardise these
  blog.SetupBlogRoutes(db, app)
  photos.InitPhotoRoutes(db, app)
  config.SetupConfigRoutes(app)
  tasks.InitTasksRoutes(app, db)
  image.InitImageRoutes(app, db)
  activities.SetupActivityRoutes(app, db)
}
