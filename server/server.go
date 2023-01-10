package server

import (
  "cloud.google.com/go/firestore"
  "fmt"
  "github.com/go-chi/chi/v5"
  "github.com/go-chi/chi/v5/middleware"
  "log"
  "net/http"
  "os"
)

func getPort() string {
  port := os.Getenv("PORT")
  if port == "" {
    port = "8080"
  }
  return fmt.Sprintf(":%s", port)
}

func setupMiddleware(r chi.Router) {
  // TODO
  r.Use(middleware.Logger)
  r.Use(middleware.Recoverer)
}

func Init(db *firestore.Client) {
  port := getPort()

  router := chi.NewRouter()
  setupMiddleware(router)
  setupRoutes(db, router)

  log.Fatal(http.ListenAndServe(port, router))
}
