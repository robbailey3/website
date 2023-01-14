package server

import (
  "fmt"
  "log"
  "net"
  "net/http"
  "os"
  "time"

  _ "net/http/pprof"

  "cloud.google.com/go/firestore"
  "github.com/go-chi/chi/v5"
  "github.com/go-chi/chi/v5/middleware"
  "github.com/go-chi/cors"
  "github.com/go-chi/httplog"
  "github.com/go-chi/httprate"
)

func getPort() string {
  port := os.Getenv("PORT")
  if port == "" {
    port = "8080"
  }
  return fmt.Sprintf(":%s", port)
}

func serveUi(r chi.Router) {
  _, err := net.Dial("tcp", "localhost:5173")
  if err != nil {
    fs := http.FileServer(http.Dir("public"))
    r.Handle("/*", fs)
  }
}

func setupMiddleware(r chi.Router) {
  // TODO
  logger := httplog.NewLogger("robbailey3-api", httplog.Options{
    JSON: true,
  })
  r.Use(httprate.LimitByIP(100, 1*time.Minute))
  r.Use(cors.Handler(cors.Options{
    AllowedOrigins:   []string{"https://*"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    ExposedHeaders:   []string{"Link"},
    AllowCredentials: false,
    MaxAge:           300,
  }))
  r.Use(httplog.RequestLogger(logger))
  r.Use(middleware.Recoverer)
  // TODO: Evaluate whether this should be here
  r.Mount("/debug", middleware.Profiler())
}

func Init(db *firestore.Client) {
  port := getPort()

  router := chi.NewRouter()
  setupMiddleware(router)
  serveUi(router)
  setupRoutes(db, router)

  log.Fatal(http.ListenAndServe(port, router))
}
