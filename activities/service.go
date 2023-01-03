package activities

import (
  "cloud.google.com/go/firestore"
  "context"
  "github.com/pkg/errors"
)

type Service interface {
  GetActivities(ctx context.Context, request *GetActivitiesRequest) ([]*Activity, error)
  GetActivityById(ctx context.Context, id string) (*Activity, error)
}

type service struct {
  repo Repository
}

func NewService(db *firestore.Client) Service {
  return &service{
    repo: NewRepository(db),
  }
}

func (s *service) GetActivities(ctx context.Context, request *GetActivitiesRequest) ([]*Activity, error) {
  activities, err := s.repo.GetActivities(ctx, request.Limit, request.Skip)

  if err != nil {
    return nil, errors.Wrap(err, "failed to get activities from DB")
  }

  return activities, nil
}

func (s *service) GetActivityById(ctx context.Context, id string) (*Activity, error) {
  return s.repo.GetActivityById(ctx, id)
}
