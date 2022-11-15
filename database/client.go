package database

import (
	"cloud.google.com/go/firestore"
	"context"
	"os"
	"sync"
)

type Client interface {
	Collection(name string) Client
	GetMany(ctx context.Context, filter interface{}, limit, skip int) (interface{}, error)
}

type client struct {
	firestore  *firestore.Client
	collection *firestore.CollectionRef
}

var once *sync.Once

func NewClient() Client {
	var c *firestore.Client

	once.Do(func() {
		c, _ = firestore.NewClient(context.Background(), os.Getenv("GOOGLE_CLOUD_PROJECT"))
	})

	return &client{
		firestore: c,
	}
}

func (c *client) Collection(name string) Client {
	c.collection = c.firestore.Collection(name)
	return c
}

func (c *client) GetMany(ctx context.Context) (interface{}, error) {
	c.collection.Query{}
}
