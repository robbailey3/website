package blog

import (
  "context"
  "github.com/robbailey3/website-api/database"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "go.mongodb.org/mongo-driver/mongo/options"
  "time"
)

type Repository interface {
  FindMany(ctx context.Context, limit, skip int) ([]Post, error)
  FindOneById(ctx context.Context, id primitive.ObjectID) (*Post, error)
  Insert(ctx context.Context, post *PostDto) error
  UpdateById(ctx context.Context, id primitive.ObjectID, updatedDoc *UpdatePostRequest) error
  Delete(ctx context.Context, id primitive.ObjectID) error
}

type repositoryImpl struct {
  client database.Client
}

func (r repositoryImpl) FindMany(ctx context.Context, limit, skip int) ([]Post, error) {
  cursor, err := r.client.Find(ctx, bson.M{}, options.Find().SetSkip(int64(skip)).SetLimit(int64(limit)))

  if err != nil {
    return nil, err
  }

  var posts []Post

  if err := cursor.All(ctx, &posts); err != nil {
    return nil, err
  }

  return posts, nil
}

func (r repositoryImpl) FindOneById(ctx context.Context, id primitive.ObjectID) (*Post, error) {
  result := r.client.FindById(ctx, id)

  if result.Err() != nil {
    return nil, result.Err()
  }

  var post Post

  if err := result.Decode(&post); err != nil {
    return nil, err
  }

  return &post, nil
}

func (r repositoryImpl) Insert(ctx context.Context, post *PostDto) error {
  _, err := r.client.Insert(ctx, post)

  if err != nil {
    return err
  }

  return nil
}

func (r repositoryImpl) UpdateById(ctx context.Context, id primitive.ObjectID, updatedDoc *UpdatePostRequest) error {
  _, err := r.client.UpdateById(ctx, id, bson.M{"set": bson.M{"title": updatedDoc.Title, "content": updatedDoc.Content, "dateModified": time.Now()}})

  return err
}

func (r repositoryImpl) Delete(ctx context.Context, id primitive.ObjectID) error {
  _, err := r.client.DeleteById(ctx, id)

  return err
}

func NewRepository() Repository {
  return &repositoryImpl{
    client: database.NewClient("posts"),
  }
}
