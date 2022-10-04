package main

import (
	"fmt"
	"os"

	"github.com/robbailey3/websiteApi/server"
)

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return fmt.Sprintf(":%s", port)
}

func main() {
	server.Init()
}
