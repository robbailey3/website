package activities

import (
  "cloud.google.com/go/firestore"
  "github.com/gofiber/fiber/v2"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/response"
)

type Service interface {
  GetActivities(ctx *fiber.Ctx) error
}

type service struct {
  repo Repository
}

func NewService(db *firestore.Client) Service {
  return &service{
    repo: NewRepository(db),
  }
}

func (s *service) GetActivities(ctx *fiber.Ctx) error {
  activities, err := s.repo.GetActivities(ctx.Context())

  if err != nil {
    return errors.Wrap(err, "failed to get activities from DB")
  }

  return response.Ok(ctx, activities)
}
