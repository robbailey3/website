package config

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func InitEnv() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found")
	}
}

func InitDb() {
	ctx := context.Background()
	_, err := firestore.NewClient(ctx, os.Getenv("GOOGLE_PROJECT_ID"))
	if err != nil {
		// TODO: Handle error.
		log.Fatal(err)
	}
}
