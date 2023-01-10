package photos

import (
  "cloud.google.com/go/firestore"
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/middleware"
)

func InitPhotoRoutes(db *firestore.Client, router chi.Router) {
  r := NewRepository(db)
  s := NewService(r)
  c := NewController(s)

  router.Route("/photos", func(r chi.Router) {
    r.Use(middleware.WithFirebaseAuth)
    r.Post("/", c.UploadPhoto)
  })
}
