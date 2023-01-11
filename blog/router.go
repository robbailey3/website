package blog

import (
  "cloud.google.com/go/firestore"
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/middleware"
)

func SetupBlogRoutes(db *firestore.Client, router chi.Router) {
  repo := NewRepository(db)
  NewService(repo)
  c := NewController(instance)

  router.Route("/blog", func(r chi.Router) {
    r.Get("/", c.GetPosts)
    r.Get("/{id}", c.GetPost)
    r.Group(func(r chi.Router) {
      r.Use(middleware.WithFirebaseAuth)
      r.Post("/", c.AddPost)
      r.Patch("/{id}", c.UpdatePost)
      r.Delete("/{id}", c.DeletePost)
    })
  })
}
