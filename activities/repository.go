package activities

import (
  "context"
)

type Repository interface {
  GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error)
  GetSegments(ctx context.Context, activityId int64) ([]*Segment, error)
  GetSplits(ctx context.Context, activityId int64) ([]*Split, error)
  GetActivityById(ctx context.Context, id string) (*Activity, error)
  GetActivityByStravaId(ctx context.Context, id int64) (*Activity, error)
  UpsertActivity(ctx context.Context, activity *CreateActivityRequest) (int64, error)
}

type repository struct {
}

func (r repository) GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error) {
  // TODO implement me
  panic("implement me")
}

func (r repository) GetSegments(ctx context.Context, activityId int64) ([]*Segment, error) {
  // TODO implement me
  panic("implement me")
}

func (r repository) GetSplits(ctx context.Context, activityId int64) ([]*Split, error) {
  // TODO implement me
  panic("implement me")
}

func (r repository) GetActivityById(ctx context.Context, id string) (*Activity, error) {
  // TODO implement me
  panic("implement me")
}

func (r repository) GetActivityByStravaId(ctx context.Context, id int64) (*Activity, error) {
  // TODO implement me
  panic("implement me")
}

func (r repository) UpsertActivity(ctx context.Context, activity *CreateActivityRequest) (int64, error) {
  // TODO implement me
  panic("implement me")
}

func NewRepository() Repository {
  return &repository{}
}
