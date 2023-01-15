package blog

import (
  "context"
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

func (s *ServiceImpl) GetPosts(ctx context.Context, limit, offset int) ([]Post, error) {
  posts, err := s.Repo.GetMany(ctx, limit, offset)

  if err != nil {
    return nil, err
  }

  return posts, err
}

func (s *ServiceImpl) GetPost(ctx context.Context, id string) (*Post, error) {
  post, err := s.Repo.GetOne(ctx, id)

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

  if err := s.Repo.Insert(ctx, &post); err != nil {
    return err
  }

  return nil
}

func (s *ServiceImpl) UpdatePost(ctx context.Context, id string, req *UpdatePostRequest) error {
  if err := s.Repo.UpdateOne(ctx, id, req); err != nil {
    return err
  }

  return nil
}

func (s *ServiceImpl) DeletePost(ctx context.Context, id string) error {
  return s.Repo.Delete(ctx, id)
}
