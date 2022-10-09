package config

import (
	"github.com/gofiber/fiber/v2"
	"github.com/robbailey3/website-api/response"
	"os"
)

type Controller interface {
	GetFirebaseConfig(ctx *fiber.Ctx) error
}

type controller struct{}

func NewController() Controller {
	return &controller{}
}

func (c controller) GetFirebaseConfig(ctx *fiber.Ctx) error {
	return response.Ok(ctx, firebaseConfig{
		ApiKey:            os.Getenv("FIREBASE_API_KEY"),
		AuthDomain:        os.Getenv("FIREBASE_AUTH_DOMAIN"),
		ProjectId:         os.Getenv("GOOGLE_CLOUD_PROJECT"),
		StorageBucket:     os.Getenv("FIREBASE_STORAGE_BUCKET"),
		MessagingSenderId: os.Getenv("FIREBASE_MESSAGING_SENDER_ID"),
		AppId:             os.Getenv("FIREBASE_APP_ID"),
		MeasurementId:     os.Getenv("FIREBASE_MEASUREMENT_ID"),
	})
}
