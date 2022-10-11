package middleware

import (
	"errors"
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

	if err != nil {
		log.Printf("error getting Auth client: %v\n", err)
		return response.ServerError(ctx, err)
	}

	authHeader := ctx.Get("Authorization")

	if authHeader == "" {
		return response.Unauthorized(ctx, errors.New("no auth header"))
	}

	idToken := strings.Split(authHeader, " ")[1]

	token, err := client.VerifyIDToken(ctx.Context(), idToken)

	if err != nil {
		log.Printf("error verifying ID token: %v\n", err)
		return response.Unauthorized(ctx, errors.New("unable to verify token"))
	}

	log.Printf("Verified ID token: %v\n", token)

	return ctx.Next()
}
