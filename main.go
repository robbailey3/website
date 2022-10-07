package main

import (
	"log"

	"github.com/robbailey3/website-api/config"
	"github.com/robbailey3/website-api/database"
	"github.com/robbailey3/website-api/server"
)

func main() {
	config.InitEnv()

	client, err := database.Init()

	if err != nil {
		log.Fatal(err)
	}

	server.Init(client)
}
