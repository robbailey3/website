package server

import (
  "cloud.google.com/go/firestore"
  "github.com/go-chi/chi/v5"
  "github.com/robbailey3/website-api/activities"
  "github.com/robbailey3/website-api/blog"
  "github.com/robbailey3/website-api/config"
  "github.com/robbailey3/website-api/github"
  "github.com/robbailey3/website-api/image"
  "github.com/robbailey3/website-api/openai"
  "github.com/robbailey3/website-api/photos"
  "github.com/robbailey3/website-api/secrets"
  "github.com/robbailey3/website-api/tasks"
  "log"
  "net/http"
)

func setupRoutes(db *firestore.Client, router chi.Router) {
  router.Route("/api", func(r chi.Router) {
    r.Use(func(next http.Handler) http.Handler {
      return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        next.ServeHTTP(w, r)
      })
    })
    secretsClient, err := secrets.NewClient()
    if err != nil {
      log.Fatalf(err.Error())
    }

    blog.SetupBlogRoutes(r)
    photos.InitPhotoRoutes(r)
    config.SetupConfigRoutes(r)
    tasks.InitTasksRoutes(r)
    image.InitImageRoutes(r)
    activities.SetupActivityRoutes(r, secretsClient)
    github.SetupRoutes(r, secretsClient)
    openai.SetupOpenAiRoutes(r, secretsClient)
  })
}
