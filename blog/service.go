package blog

import (
	"context"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Service interface {
	GetPosts(ctx *fiber.Ctx) ([]Post, error)
	GetPost(ctx *fiber.Ctx) (*Post, error)
	InsertPost(ctx *fiber.Ctx) error
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

func (s service) GetPosts(ctx *fiber.Ctx) ([]Post, error) {
	posts, err := s.repo.GetMany(ctx.Context())

	if err != nil {
		return nil, err
	}

	return posts, err
}

func (s service) GetPost(ctx *fiber.Ctx) (*Post, error) {
	post, err := s.repo.GetOne(ctx.Context(), ctx.Params("id"))

	if err != nil {
		return nil, err
	}

	return post, err
}

func (s service) InsertPost(ctx *fiber.Ctx) error {
	var post Post

	if err := ctx.BodyParser(&post); err != nil {
		return err
	}

	post.DateAdded = time.Now()
	post.DateModified = time.Now()

	if err := s.repo.Insert(ctx.Context(), post); err != nil {
		return err
	}

	return nil
}

func (s service) UpdatePost(ctx context.Context, id string, req UpdatePostRequest) error {
	if err := s.repo.UpdateOne(ctx, id, req); err != nil {
		return err
	}

	return nil
}

func (s service) DeletePost(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
