package blog

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/middleware"
)

func SetupBlogRoutes(db *firestore.Client, router fiber.Router) {
	repo := NewRepository(db)
	NewService(repo)
	c := NewController(instance)

	group := router.Group("blog")

	group.Get("", c.GetPosts)
	group.Post("", middleware.WithFirebaseAuth, c.AddPost)
	group.Get("/:id", c.GetPost)
}
