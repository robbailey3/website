package config

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

func InitEnv() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found")
	}
}

func InitDb() (*firestore.Client, error) {
	client, err := firestore.NewClient(context.Background(), os.Getenv("GOOGLE_PROJECT_ID"))
	if err != nil {
		return nil, err
	}

	return client, err
}
