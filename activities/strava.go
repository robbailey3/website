package activities

import (
  "context"
)

type StravaApiService interface {
  GetActivity(ctx context.Context, id string) (*StravaActivity, error)
}

type stravaApiService struct {
}

func (s *stravaApiService) GetActivity(ctx context.Context, id string) (*StravaActivity, error) {
  // client := &http.Client{}
  return nil, nil
}
