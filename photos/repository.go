package photos

import (
	"cloud.google.com/go/firestore"
	"context"
	"google.golang.org/api/iterator"
)

type Repository interface {
	GetMany(ctx context.Context, limit, offset int) ([]*Photo, error)
	GetPhoto(ctx context.Context, id string) (*Photo, error)
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{
		collection: db.Collection("photos"),
	}
}

func (r *repository) GetMany(ctx context.Context, limit, offset int) ([]*Photo, error) {
	var photos []*Photo

	docs := r.collection.Limit(limit).Offset(offset).OrderBy("DateModified", firestore.Desc).Documents(ctx)

	for {
		var currentDoc Photo

		doc, err := docs.Next()

		if err == iterator.Done {
			return photos, nil
		}

		if err := doc.DataTo(&currentDoc); err != nil {
			return nil, err
		}

		currentDoc.Id = doc.Ref.ID

		photos = append(photos, &currentDoc)
	}
}

func (r *repository) GetPhoto(ctx context.Context, id string) (*Photo, error) {
	var photo Photo

	doc, err := r.collection.Doc(id).Get(ctx)

	if err != nil {
		return nil, err
	}

	if err := doc.DataTo(photo); err != nil {
		return nil, err
	}

	return &photo, nil
}
