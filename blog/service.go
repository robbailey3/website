package blog

import (
	"github.com/gofiber/fiber/v2"
	"sync"
	"time"
)

type Service interface {
	GetPosts(ctx *fiber.Ctx) ([]Post, error)
	InsertPost(ctx *fiber.Ctx) error
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
