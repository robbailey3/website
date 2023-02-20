package main

import (
  "github.com/getsentry/sentry-go"
  "log"
  "os"
  "time"

  "github.com/robbailey3/website-api/config"
  "github.com/robbailey3/website-api/database"
  "github.com/robbailey3/website-api/server"
)

func initialiseSentry() {
  err := sentry.Init(sentry.ClientOptions{
    Dsn: os.Getenv("SENTRY_DSN"),
    // Set TracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production,
    TracesSampleRate: 1.0,
  })
  if err != nil {
    log.Fatalf("sentry.Init: %s", err)
  }
  // Flush buffered events before the program terminates.
  defer sentry.Flush(2 * time.Second)
}

func main() {
  config.InitEnv()

  initialiseSentry()

  err := database.Init()

  if err != nil {
    panic(err)
  }

  server.Init()
}
