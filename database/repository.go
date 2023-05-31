package database

import (
  "context"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "go.mongodb.org/mongo-driver/mongo/options"
)

// TODO: Maybe relocate this to a "common" package

type BaseRepository[T any] interface {
  FindAll(ctx context.Context, limit, skip int, result []T) error
  FindOne(ctx context.Context, id primitive.ObjectID, result T) error
}

type baseRepositoryImpl[T any] struct {
  client Client
}

func (b *baseRepositoryImpl[T]) FindAll(ctx context.Context, limit, skip int, result []T) error {
  cursor, err := b.client.Find(ctx, bson.M{}, options.Find().SetSkip(int64(skip)).SetLimit(int64(limit)))

  if err != nil {
    return err
  }

  if err := cursor.All(ctx, result); err != nil {
    return err
  }

  return nil
}

func (b *baseRepositoryImpl[T]) FindOne(ctx context.Context, id primitive.ObjectID, result T) error {
  dbResult := b.client.FindById(ctx, id)

  if err := dbResult.Decode(result); err != nil {
    return err
  }

  return nil
}

func NewBaseRepository[T any](collectionName string) BaseRepository[T] {
  return &baseRepositoryImpl[T]{
    client: NewClient(collectionName),
  }
}
