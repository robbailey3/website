package activities

import (
  "context"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/activities/auth"
  "github.com/robbailey3/website-api/secrets"
)

type Service interface {
  GetActivities(ctx context.Context, request *GetActivitiesRequest) ([]*Activity, error)
  GetActivityById(ctx context.Context, id string) (*Activity, error)
  VerifyWebhook(req WebhookChallengeRequest) bool
  HandleActivityChange(ctx context.Context, activityId int) error
}

type service struct {
  repo             Repository
  stravaApiService StravaApiService
}

func NewService(secretsClient secrets.Client) (Service, error) {
  authService, err := auth.NewService(secretsClient)
  if err != nil {
    return nil, err
  }
  return &service{
    repo:             NewRepository(),
    stravaApiService: NewStravaService(authService, secretsClient),
  }, nil
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

func (s *service) VerifyWebhook(req WebhookChallengeRequest) bool {
  return s.stravaApiService.WebhookIsValid(req)
}

func (s *service) HandleActivityChange(ctx context.Context, activityId int) error {
  a, err := s.stravaApiService.GetActivity(ctx, activityId)

  if err != nil {
    return errors.Wrap(err, "Failed to get activity from strava")
  }

  if _, err := s.repo.UpsertActivity(ctx, a.MapToDatabaseModel()); err != nil {
    return errors.Wrap(err, "Failed to insert activity into database")
  }

  return nil
}
