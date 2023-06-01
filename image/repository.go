package image

import (
  "context"
  "github.com/robbailey3/website-api/database"
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository interface {
  Insert(ctx context.Context, image *AiImage) (*primitive.ObjectID, error)
  GetById(ctx context.Context, id primitive.ObjectID) (*AiImage, error)
}

type repository struct {
  client database.Client
}

func NewRepository() Repository {
  return &repository{
    client: database.NewClient("images"),
  }
}

func (r repository) GetById(ctx context.Context, id primitive.ObjectID) (*AiImage, error) {
  result := r.client.FindById(ctx, id)

  if result.Err() != nil {
    return nil, result.Err()
  }

  var aiImage AiImage

  if err := result.Decode(&aiImage); err != nil {
    return nil, err
  }

  return &aiImage, nil
}

func (r repository) Insert(ctx context.Context, image *AiImage) (*primitive.ObjectID, error) {
  result, err := r.client.Insert(ctx, image)

  if err != nil {
    return nil, err
  }

  id := result.InsertedID.(primitive.ObjectID)

  return &id, nil
}
