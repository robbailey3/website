package photos

import (
	"cloud.google.com/go/firestore"
)

type Repository interface {
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{
		collection: db.Collection("photos"),
	}
}
