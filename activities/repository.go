package activities

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Repository interface {
	GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error)
	GetActivityById(ctx context.Context, id string) (*Activity, error)
	InsertActivity(ctx context.Context, activity *Activity) error
	UpdateActivity(ctx context.Context, id string, activity *Activity) error
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{collection: db.Collection("activities")}
}

func (r repository) GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error) {
	activities := []*Activity{}

	docs := r.collection.Limit(10).OrderBy("DateModified", firestore.Desc).
		Limit(limit).
		Offset(offset).
		Documents(ctx)

	for {
		var currentDoc Activity

		doc, err := docs.Next()

		if err == iterator.Done {
			return activities, nil
		}

		if err := doc.DataTo(&currentDoc); err != nil {
			return nil, err
		}

		currentDoc.Id = doc.Ref.ID

		activities = append(activities, &currentDoc)
	}
}

func (r repository) GetActivityById(ctx context.Context, id string) (*Activity, error) {
	doc, err := r.collection.Doc(id).Get(ctx)

	if status.Code(err) == codes.NotFound {
		log.Println("Not found")
	}

	var activity Activity

	err = doc.DataTo(&activity)

	if err != nil {
		return nil, err
	}

	return &activity, nil
}

func (r repository) InsertActivity(ctx context.Context, activity *Activity) error {
	_, _, err := r.collection.Add(ctx, activity)

	if err != nil {
		return err
	}

	return nil
}

func (r repository) UpdateActivity(ctx context.Context, id string, activity *Activity) error {
	// TODO implement me
	panic("implement me")
}
