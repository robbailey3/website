package blog

import (
	"cloud.google.com/go/firestore"
	"context"
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

	docs, err := iter.GetAll()

	if err != nil {
		return nil, err
	}

	var posts []Post

	for _, doc := range docs {
		var post Post
		if err := doc.DataTo(&post); err != nil {
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
