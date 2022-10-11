package tasks

import (
	"cloud.google.com/go/firestore"
	"context"
	"google.golang.org/api/iterator"
	"time"
)

type Repository interface {
	Get(ctx context.Context) ([]*Task, error)
	Create(ctx context.Context, task *Task) error
	Update(ctx context.Context, id string, title string, completed bool) error
	Delete(ctx context.Context, id string) error
}

type repository struct {
	collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
	return &repository{
		collection: db.Collection("tasks"),
	}
}

func (r *repository) Get(ctx context.Context) ([]*Task, error) {
	var tasks []*Task

	docs := r.collection.OrderBy("DateModified", firestore.Desc).Documents(ctx)

	for {
		var task Task

		doc, err := docs.Next()

		if err == iterator.Done {
			return tasks, nil
		}

		if err := doc.DataTo(&task); err != nil {
			return nil, err
		}

		task.Id = doc.Ref.ID

		tasks = append(tasks, &task)
	}
}

func (r *repository) Create(ctx context.Context, task *Task) error {
	task.DateModified = time.Now()
	task.DateAdded = time.Now()

	_, _, err := r.collection.Add(ctx, task)

	if err != nil {
		return err
	}

	return nil
}

func (r *repository) Update(ctx context.Context, id string, title string, completed bool) error {
	_, err := r.collection.Doc(id).Update(ctx, []firestore.Update{
		{
			Path:  "Title",
			Value: title,
		},
		{
			Path:  "Completed",
			Value: completed,
		},
		{
			Path:  "DateModified",
			Value: time.Now(),
		},
	})

	return err
}

func (r *repository) Delete(ctx context.Context, id string) error {
	_, err := r.collection.Doc(id).Delete(ctx)

	return err
}
