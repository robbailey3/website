package middleware

import (
	"log"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
)

func WithFirebaseAuth(ctx *fiber.Ctx) error {
	app, err := firebase.NewApp(ctx.Context(), nil)

	if err != nil {
		log.Printf("error instantiating firebase app: %v\n", err)
		return response.ServerError(ctx, err)
	}

	client, err := app.Auth(ctx.Context())

	authHeader := ctx.Get("Authorization")

	idToken := strings.Split(authHeader, " ")[1]

	if err != nil {
		log.Printf("error getting Auth client: %v\n", err)
		return response.ServerError(ctx, err)
	}

	token, err := client.VerifyIDToken(ctx.Context(), idToken)
	if err != nil {
		log.Printf("error verifying ID token: %v\n", err)
		return err
	}

	log.Printf("Verified ID token: %v\n", token)

	return ctx.Next()
}
