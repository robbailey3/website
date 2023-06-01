package blog

import (
  "context"
  "github.com/pkg/errors"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "sync"
  "time"
)

type Service interface {
  GetPosts(ctx context.Context, limit, offset int) ([]Post, error)
  GetPost(ctx context.Context, id string) (*Post, error)
  AddPost(ctx context.Context, req *AddPostRequest) error
  UpdatePost(ctx context.Context, id string, request *UpdatePostRequest) error
  DeletePost(ctx context.Context, id string) error
}

type ServiceImpl struct {
  Repo  Repository
  Clock func() time.Time
}

var once sync.Once

var instance Service

func NewService(repo Repository) Service {
  once.Do(func() {
    instance = &ServiceImpl{
      Repo:  repo,
      Clock: func() time.Time { return time.Now() },
    }
  })

  return instance
}

func (s *ServiceImpl) GetPosts(ctx context.Context, limit, skip int) ([]Post, error) {
  posts, err := s.Repo.FindMany(ctx, limit, skip)

  if err != nil {
    return nil, err
  }

  return posts, err
}

func (s *ServiceImpl) GetPost(ctx context.Context, id string) (*Post, error) {
  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    return nil, errors.Wrap(err, "failed to parse id")
  }

  post, err := s.Repo.FindOneById(ctx, objId)

  if err != nil {
    return nil, err
  }

  return post, err
}

func (s *ServiceImpl) AddPost(ctx context.Context, req *AddPostRequest) error {
  var post PostDto

  post.Title = req.Title
  post.Content = req.Content
  post.DateAdded = s.Clock()
  post.DateModified = s.Clock()

  err := s.Repo.Insert(ctx, &post)

  if err != nil {
    return err
  }

  return nil
}

func (s *ServiceImpl) UpdatePost(ctx context.Context, id string, req *UpdatePostRequest) error {
  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    return errors.Wrap(err, "failed to parse id")
  }

  if err := s.Repo.UpdateById(ctx, objId, req); err != nil {
    return err
  }

  return nil
}

func (s *ServiceImpl) DeletePost(ctx context.Context, id string) error {
  objId, err := primitive.ObjectIDFromHex(id)

  if err != nil {
    return errors.Wrap(err, "failed to parse id")
  }

  return s.Repo.Delete(ctx, objId)
}
