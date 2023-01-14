package blog

import (
  "context"
  "fmt"
  "sync"
)

type Service interface {
  GetPosts(ctx context.Context, limit, offset int) ([]Post, error)
  GetPost(ctx context.Context, id string) (*Post, error)
  InsertPost(ctx context.Context, req *InsertPostRequest) error
  UpdatePost(ctx context.Context, id string, request UpdatePostRequest) error
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

func (s *service) InsertPost(ctx context.Context, req *InsertPostRequest) error {
  // var post Post
  //
  // if err := ctx.BodyParser(&post); err != nil {
  //   return err
  // }
  //
  // post.DateAdded = time.Now()
  // post.DateModified = time.Now()
  //
  // if err := s.repo.Insert(ctx.Context(), post); err != nil {
  //   return err
  // }
  //
  // return nil
  return fmt.Errorf("method not implemented yet")
}

func (s *service) UpdatePost(ctx context.Context, id string, req UpdatePostRequest) error {
  if err := s.repo.UpdateOne(ctx, id, req); err != nil {
    return err
  }

  return nil
}

func (s *service) DeletePost(ctx context.Context, id string) error {
  return s.repo.Delete(ctx, id)
}
