package blog

import (
	"context"
	"log"
	"time"

	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"cloud.google.com/go/firestore"
)

type Repository interface {
	GetMany(ctx context.Context) ([]Post, error)
	GetOne(ctx context.Context, id string) (*Post, error)
	UpdateOne(ctx context.Context, id string, update UpdatePostRequest) error
	Insert(ctx context.Context, post Post) error
	Delete(ctc context.Context, id string) error
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{collection: db.Collection("posts")}
}

func (r *repository) GetMany(ctx context.Context) ([]Post, error) {
	var posts []Post

	docs := r.collection.Limit(10).OrderBy("DateModified", firestore.Desc).Documents(ctx)

	for {
		var currentDoc Post

		doc, err := docs.Next()

		if err == iterator.Done {
			return posts, nil
		}

		if err := doc.DataTo(&currentDoc); err != nil {
			return nil, err
		}

		currentDoc.Id = doc.Ref.ID

		posts = append(posts, currentDoc)
	}
}

func (r *repository) GetOne(ctx context.Context, id string) (*Post, error) {
	doc, err := r.collection.Doc(id).Get(ctx)

	if status.Code(err) == codes.NotFound {
		log.Println("Not found")
	}

	var post Post

	err = doc.DataTo(&post)

	if err != nil {
		return nil, err
	}

	return &post, nil
}

func (r *repository) UpdateOne(ctx context.Context, id string, update UpdatePostRequest) error {
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{
			Path:  "Title",
			Value: update.Title,
		},
		{
			Path:  "Content",
			Value: update.Content,
		},
		{
			Path:  "DateModified",
			Value: time.Now(),
		},
	})

	return err
}

func (r *repository) Insert(ctx context.Context, post Post) error {
	_, _, err := r.collection.Add(ctx, post)

	if err != nil {
		return err
	}

	return nil
}

func (r *repository) Delete(ctx context.Context, id string) error {
	_, err := r.collection.Doc(id).Delete(ctx)

	return err
}
