package config

import (
	"github.com/joho/godotenv"
	"log"
)

func InitEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Print("No .env file found")
	}
}
