package photos

import (
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/middleware"
)

func InitPhotoRoutes(router chi.Router) {
  r := NewRepository()
  s := NewService(r)
  c := NewController(s)

  router.Route("/photos", func(r chi.Router) {
    r.Use(middleware.WithFirebaseAuth)
    r.Post("/", c.UploadPhoto)
  })
}
