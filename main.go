package main

import (
	"github.com/robbailey3/website-api/config"
	"github.com/robbailey3/website-api/server"
	"log"
)

func main() {
	config.InitEnv()
	dbClient, err := config.InitDb()

	if err != nil {
		log.Fatal(err)
	}

	server.Init(dbClient)
}
