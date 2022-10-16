package photos

import (
	"cloud.google.com/go/firestore"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func InitPhotoRoutes(db *firestore.Client, router fiber.Router) {
	fmt.Println(db)
	r := NewRepository(db)
	s := NewService(r)
	c := NewController(s)

	group := router.Group("photos")

	group.Post("", c.UploadPhoto)
}
