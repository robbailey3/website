package blog

import (
	"context"
	"google.golang.org/api/iterator"

	"cloud.google.com/go/firestore"
)

type Repository interface {
	GetMany(ctx context.Context) ([]Post, error)
	GetOne() (*Post, error)
	UpdateOne() error
	Insert(ctx context.Context, post Post) error
	Delete() error
}

type repository struct {
	collectionName string
	db             *firestore.Client
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{"posts", db}
}

func (r *repository) GetMany(ctx context.Context) ([]Post, error) {
	var posts []Post

	coll := r.db.Collection(r.collectionName)

	docs := coll.Limit(10).OrderBy("dateModified", firestore.Desc).Documents(ctx)

	for {
		var currentDoc Post

		doc, err := docs.Next()

		if err == iterator.Done {
			return posts, nil
		}

		if err := doc.DataTo(&currentDoc); err != nil {
			return nil, err
		}

		posts = append(posts, currentDoc)
	}
}

func (r *repository) GetOne() (*Post, error) {
	// TODO implement me
	panic("implement me")
}

func (r *repository) UpdateOne() error {
	// TODO implement me
	panic("implement me")
}

func (r *repository) Insert(ctx context.Context, post Post) error {
	coll := r.db.Collection(r.collectionName)

	_, _, err := coll.Add(ctx, post)

	if err != nil {
		return err
	}

	return nil
}

func (r *repository) Delete() error {
	// TODO implement me
	panic("implement me")
}
