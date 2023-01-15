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

type service struct {
  repo Repository
}

var once sync.Once

var instance Service

func NewService(repo Repository) Service {
  once.Do(func() {
    instance = &service{repo}
  })

  return instance
}

func (s *service) GetPosts(ctx context.Context, limit, offset int) ([]Post, error) {
  posts, err := s.repo.GetMany(ctx, limit, offset)

  if err != nil {
    return nil, err
  }

  return posts, err
}

func (s *service) GetPost(ctx context.Context, id string) (*Post, error) {
  post, err := s.repo.GetOne(ctx, id)

  if err != nil {
    return nil, err
  }

  return post, err
}

func (s *service) AddPost(ctx context.Context, req *AddPostRequest) error {
  var post PostDto

  post.Title = req.Title
  post.Content = req.Content
  post.DateAdded = time.Now()
  post.DateModified = time.Now()

  if err := s.repo.Insert(ctx, &post); err != nil {
    return err
  }

  return nil
}

func (s *service) UpdatePost(ctx context.Context, id string, req *UpdatePostRequest) error {
  if err := s.repo.UpdateOne(ctx, id, req); err != nil {
    return err
  }

  return nil
}

func (s *service) DeletePost(ctx context.Context, id string) error {
  return s.repo.Delete(ctx, id)
}
