package blog

import (
	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
)

func SetupBlogRoutes(db *firestore.Client, router fiber.Router) {
	repo := NewRepository(db)
	NewService(repo)
	c := NewController(instance)

	group := router.Group("blog")

	group.Get("", c.GetPosts)
	group.Post("", c.AddPost)
}
