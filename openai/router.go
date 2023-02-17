package openai

import (
	"github.com/go-chi/chi/v5"
)

func SetupOpenAiRoutes(router chi.Router) {
	return
	// c := NewController()

	// router.Route("/openai", func(r chi.Router) {
	//   r.Use(httprate.LimitByIP(5, 1*time.Minute))
	//   r.Post("/completions", c.GetCompletion)
	//   r.Post("/edits", c.GetEdit)
	// })
}
