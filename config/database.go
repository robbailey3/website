package config

import (
	"context"
	"fmt"
	"os"
	"sync"

	"cloud.google.com/go/firestore"
	"github.com/joho/godotenv"
	"google.golang.org/api/iterator"
)

func InitEnv() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("No .env file found")
	}
}

var client *firestore.Client

var once sync.Once

func InitDb() error {
	var err error

	once.Do(func() {
		client, err = firestore.NewClient(context.Background(), os.Getenv("GOOGLE_PROJECT_ID"))
	})

	return err
}

type query struct {
	field    string
	operator string
	value    interface{}
}

type queryBuilder struct {
	collectionName string
	queries        []*query
}

func NewQueryBuilder(collectionName string) *queryBuilder {
	var queries []*query
	return &queryBuilder{
		collectionName: collectionName,
		queries:        queries,
	}
}

func (q *queryBuilder) Where(field, operator string, value interface{}) *queryBuilder {
	q.queries = append(q.queries, &query{
		field,
		operator,
		value,
	})

	return q
}

func (q *queryBuilder) Execute(ctx context.Context, result []interface{}) interface{} {
	var c *firestore.Client

	coll := c.Collection(q.collectionName)

	var fullQuery firestore.Query

	for _, q := range q.queries {
		fullQuery = coll.Where(q.field, q.field, q.value)
	}

	docs := fullQuery.Documents(ctx)

	for {
		var currentDoc interface{}

		doc, err := docs.Next()

		if err == iterator.Done {
			return result
		}

		doc.DataTo(&currentDoc)

		result = append(result, currentDoc)
	}
}
