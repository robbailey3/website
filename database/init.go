package database

import (
	"cloud.google.com/go/firestore"

	"context"
	"os"
	"sync"
)

var client *firestore.Client

var once sync.Once

func Init() (*firestore.Client, error) {
	var err error

	once.Do(func() {
		client, err = firestore.NewClient(context.Background(), os.Getenv("GOOGLE_CLOUD_PROJECT"))
	})

	return client, err
}
