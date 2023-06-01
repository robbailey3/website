package database

import (
  "context"
  "fmt"
  "github.com/gookit/slog"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
  "os"
  "sync"
  "time"
)

var connection *mongo.Database

var once sync.Once

func getConnectionString() string {
  return fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority", os.Getenv("DB_USERNAME"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"))
}

func Connect() error {
  var connectionError error
  once.Do(func() {
    slog.Info("Connecting to database")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(getConnectionString()))

    if err != nil {
      slog.Errorf("Failed to connect to database. Error: %s", err.Error())
      connectionError = err
    }

    connection = client.Database(os.Getenv("DB_NAME"))

    slog.Info("Successfully connected to database")
  })

  return connectionError
}
