package server

import (
  "fmt"
  "log"
  "net"
  "net/http"
  "os"
  "time"

  _ "net/http/pprof"

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

func NotFoundRoute(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(http.StatusNotFound)
}

func serveUi(r chi.Router) {
  _, err := net.Dial("tcp", "localhost:5173")
  if err != nil {
    r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
      path := chi.URLParam(r, "*")
      staticDir := "./public"
      staticFS := http.Dir(staticDir)

      _, err := staticFS.Open(path)

      if err != nil {
        if os.IsNotExist(err) {
          http.ServeFile(w, r, fmt.Sprint(staticDir, "/", "index.html"))
          return
        }
      } else {
        http.ServeFile(w, r, fmt.Sprint(staticDir, "/", path))
        return
      }

      http.ServeFile(w, r, fmt.Sprint(staticDir, "/", "index.html"))
    })
    r.Get("/wp-includes/*", NotFoundRoute)
    r.Get("/test/*", NotFoundRoute)
    r.Get("/site/*", NotFoundRoute)
    r.Get("/wp-login.php", NotFoundRoute)
    r.Get("/.env", NotFoundRoute)
    r.Get("/administrator/*", NotFoundRoute)
    r.Get("/misc/*", NotFoundRoute)
    r.Get("/wp-admin/*", NotFoundRoute)
    r.Get("/wp2/*", NotFoundRoute)
    r.Get("/wp1/*", NotFoundRoute)
    r.Get("/wp/*", NotFoundRoute)
    r.Get("/2022/*", NotFoundRoute)
    r.Get("/2019/*", NotFoundRoute)
    r.Get("/2020/*", NotFoundRoute)
    r.Get("/wordpress/*", NotFoundRoute)
  }
}

func setupMiddleware(r chi.Router) {
  // TODO
  logger := httplog.NewLogger("robbailey3-api", httplog.Options{
    JSON: true,
  })
  r.Use(httprate.LimitByIP(100, 1*time.Minute))
  r.Use(cors.Handler(cors.Options{
    AllowedOrigins:   []string{"*"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
    ExposedHeaders:   []string{"Link"},
    AllowCredentials: false,
    MaxAge:           300,
  }))
  r.Use(httplog.RequestLogger(logger))
  r.Use(middleware.Recoverer)

  // TODO: Evaluate whether this should be here
  r.Mount("/debug", middleware.Profiler())
}

func Init() {
  port := getPort()

  router := chi.NewRouter()
  setupMiddleware(router)
  setupRoutes(nil, router)
  serveUi(router)

  log.Fatal(http.ListenAndServe(port, router))
}
