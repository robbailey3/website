package main

import (
	"github.com/robbailey3/website-api/config"
	"github.com/robbailey3/website-api/database"
	"github.com/robbailey3/website-api/server"
	"log"
)

func main() {
	config.InitEnv()

	client, err := database.Init()

	if err != nil {
		log.Fatal(err)
	}

	server.Init(client)
}
