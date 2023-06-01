package tasks

import (
  "context"
  "github.com/robbailey3/website-api/database"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository interface {
  FindAll(ctx context.Context) ([]Task, error)
  Insert(ctx context.Context, task *Task) error
  UpdateById(ctx context.Context, id primitive.ObjectID, title string, completed bool) error
  Delete(ctx context.Context, id primitive.ObjectID) error
}

type repository struct {
  client database.Client
}

func (r repository) FindAll(ctx context.Context) ([]Task, error) {
  cursor, err := r.client.Find(ctx, bson.M{})

  if err != nil {
    return nil, err
  }

  var tasks []Task

  if err := cursor.All(ctx, &tasks); err != nil {
    return nil, err
  }

  return tasks, nil
}

func (r repository) Insert(ctx context.Context, task *Task) error {
  _, err := r.client.Insert(ctx, task)

  return err
}

func (r repository) UpdateById(ctx context.Context, id primitive.ObjectID, title string, completed bool) error {
  _, err := r.client.UpdateById(ctx, id, bson.M{"set": bson.M{"title": title, "completed": completed}})

  return err
}

func (r repository) Delete(ctx context.Context, id primitive.ObjectID) error {
  _, err := r.client.DeleteById(ctx, id)

  return err
}

func NewRepository() Repository {
  return &repository{
    client: database.NewClient("tasks"),
  }
}
