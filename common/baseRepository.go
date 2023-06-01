package database

import (
	"context"

	"github.com/robbailey3/website-api/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type BaseRepository[T any] interface {
	FindAll(ctx context.Context, limit, skip int, result []T) error
	FindOne(ctx context.Context, id primitive.ObjectID, result T) error
	Insert(ctx context.Context, document T) (*primitive.ObjectID, error)
	UpdateById(ctx context.Context, id primitive.ObjectID, updatedDocument T) error
	DeleteById(ctx context.Context, id primitive.ObjectID) error
}

type baseRepositoryImpl[T any] struct {
	Client database.Client
}

func (b *baseRepositoryImpl[T]) FindAll(ctx context.Context, limit, skip int, result []T) error {
	cursor, err := b.Client.Find(ctx, bson.M{}, options.Find().SetSkip(int64(skip)).SetLimit(int64(limit)))

	if err != nil {
		return err
	}

	if err := cursor.All(ctx, result); err != nil {
		return err
	}

	return nil
}

func (b *baseRepositoryImpl[T]) FindOne(ctx context.Context, id primitive.ObjectID, result T) error {
	dbResult := b.Client.FindById(ctx, id)

	if err := dbResult.Decode(result); err != nil {
		return err
	}

	return nil
}

func (b *baseRepositoryImpl[T]) Insert(ctx context.Context, document T) (*primitive.ObjectID, error) {
	result, err := b.Client.Insert(ctx, document)

	if err != nil {
		return nil, err
	}

	return result.InsertedID.(*primitive.ObjectID), nil
}

func (b *baseRepositoryImpl[T]) UpdateById(ctx context.Context, id primitive.ObjectID, updatedDocument T) error {
	_, err := b.Client.UpdateById(ctx, id, updatedDocument)

	if err != nil {
		return err
	}

	return nil
}

func (b *baseRepositoryImpl[T]) DeleteById(ctx context.Context, id primitive.ObjectID) error {
	_, err := b.Client.DeleteById(ctx, id)

	if err != nil {
		return err
	}

	return nil
}

func NewBaseRepository[T any](collectionName string) BaseRepository[T] {
	return &baseRepositoryImpl[T]{
		Client: database.NewClient(collectionName),
	}
}

type Post struct {
	Id    primitive.ObjectID `bson:"_id"`
	Title string             `bson:"title"`
}

type blogRepo struct {
	BaseRepository[Post]
}

func NewBlogRepo() *blogRepo {
	return &blogRepo{
		BaseRepository: NewBaseRepository[Post]("posts"),
	}
}
