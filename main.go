package main

import (
	"github.com/robbailey3/website-api/config"
	"github.com/robbailey3/website-api/server"
)

func main() {
	config.InitEnv()
	config.InitDb()
	server.Init()
}
