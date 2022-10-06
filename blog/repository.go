package blog

import (
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type Repository interface {
	GetMany(ctx context.Context) ([]Post, error)
	GetOne() (*Post, error)
	UpdateOne() error
	Insert() error
	Delete() error
}

type repository struct {
	db *firestore.Client
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{db}
}

func (r *repository) GetMany(ctx context.Context) ([]Post, error) {
	iter := r.db.Collection("posts").Documents(ctx)

	var posts []Post

	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			return nil, err
		}

		var post Post

		err = doc.DataTo(&post)

		if err != nil {
			return nil, err
		}

		posts = append(posts, post)
	}

	return posts, nil
}

func (r *repository) GetOne() (*Post, error) {
	// TODO implement me
	panic("implement me")
}

func (r *repository) UpdateOne() error {
	// TODO implement me
	panic("implement me")
}

func (r *repository) Insert() error {
	// TODO implement me
	panic("implement me")
}

func (r *repository) Delete() error {
	// TODO implement me
	panic("implement me")
}
