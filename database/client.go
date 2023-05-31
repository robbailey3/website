package database

import (
  "context"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

type Client interface {
  Find(ctx context.Context, filter interface{}, options ...*options.FindOptions) (*mongo.Cursor, error)
  FindById(ctx context.Context, id primitive.ObjectID) *mongo.SingleResult
  FindOne(ctx context.Context, filter interface{}, options ...*options.FindOneOptions) *mongo.SingleResult
  Insert(ctx context.Context, document interface{}, options ...*options.InsertOneOptions) error
  Update(ctx context.Context, filter interface{}, updates interface{}, options ...*options.UpdateOptions)
  DeleteById(ctx context.Context, id primitive.ObjectID) error
}

type clientImpl struct {
  collection *mongo.Collection
}

func NewClient(collectionName string) Client {
  return &clientImpl{
    collection: connection.Collection(collectionName),
  }
}

func (c *clientImpl) Find(ctx context.Context, filter interface{}, options ...*options.FindOptions) (*mongo.Cursor, error) {
  return c.collection.Find(ctx, filter, options...)
}

func (c *clientImpl) FindById(ctx context.Context, id primitive.ObjectID) *mongo.SingleResult {
  return c.collection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": id}})
}

func (c *clientImpl) FindOne(ctx context.Context, filter interface{}, options ...*options.FindOneOptions) *mongo.SingleResult {
  // TODO implement me
  panic("implement me")
}

func (c *clientImpl) Insert(ctx context.Context, document interface{}, options ...*options.InsertOneOptions) error {
  // TODO implement me
  panic("implement me")
}

func (c *clientImpl) Update(ctx context.Context, filter interface{}, updates interface{}, options ...*options.UpdateOptions) {
  // TODO implement me
  panic("implement me")
}

func (c *clientImpl) DeleteById(ctx context.Context, id primitive.ObjectID) error {
  // TODO implement me
  panic("implement me")
}
