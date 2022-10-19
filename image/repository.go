package image

import (
	"cloud.google.com/go/firestore"
	"context"
)

type Repository interface {
	Insert(ctx context.Context, image *AiImage) (*string, error)
	GetById(ctx context.Context, id string) (*AiImage, error)
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{
		collection: db.Collection("ai-images"),
	}
}

func (r *repository) GetById(ctx context.Context, id string) (*AiImage, error) {
	var image AiImage

	doc, err := r.collection.Doc(id).Get(ctx)

	if err != nil {
		return nil, err
	}

	if err = doc.DataTo(&image); err != nil {
		return nil, err
	}

	return &image, nil
}

func (r *repository) Insert(ctx context.Context, image *AiImage) (*string, error) {
	doc, _, err := r.collection.Add(ctx, image)

	if err != nil {
		return nil, err
	}

	return &doc.ID, nil
}
