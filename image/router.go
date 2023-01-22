package image

import (
  "github.com/go-chi/chi/v5"
)

func InitImageRoutes(router chi.Router) {
  controller := NewController()

  router.Route("/image", func(r chi.Router) {
    r.Post("/", controller.Upload)
    r.Post("/", controller.Upload)
    r.Get("/{id}", controller.GetImage)
    r.Get("/{id}/labels", controller.GetLabels)
    r.Get("/{id}/properties", controller.GetProperties)
    r.Get("/{id}/landmarks", controller.GetLandmarks)
    r.Get("/{id}/logos", controller.GetLogos)
    r.Get("/{id}/faces", controller.GetFaces)
  })

}
