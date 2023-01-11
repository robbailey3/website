package server

import (
	"fmt"
	"log"
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

func setupMiddleware(r chi.Router) {
	// TODO
	logger := httplog.NewLogger("robbailey3-api", httplog.Options{
		JSON: true,
	})
	r.Use(httprate.LimitByIP(100, 1*time.Minute))
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
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
	setupRoutes(db, router)

	log.Fatal(http.ListenAndServe(port, router))
}
