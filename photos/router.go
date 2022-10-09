package photos

import (
	"cloud.google.com/go/firestore"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/middleware"
)

func InitPhotoRoutes(db *firestore.Client, router fiber.Router) {
	fmt.Println(db)
	r := NewRepository(db)
	s := NewService(r)
	c := NewController(s)

	group := router.Group("photos")

	group.Post("", middleware.WithFirebaseAuth, c.UploadPhoto)
}
