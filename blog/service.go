package blog

import (
	"github.com/gofiber/fiber/v2"
	"sync"
)

type Service interface {
	GetPosts(ctx *fiber.Ctx) ([]Post, error)
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
