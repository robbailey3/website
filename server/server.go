package server

import (
  "cloud.google.com/go/firestore"
  "fmt"
  "github.com/go-chi/chi/v5"
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

func setupMiddleware(router chi.Router) {
  // TODO
}

func Init(db *firestore.Client) {
  port := getPort()

  router := chi.NewRouter()
  setupMiddleware(router)
  setupRoutes(db, router)

  log.Fatal(http.ListenAndServe(port, router))
}
