package activities

import (
  "context"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/database"
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

func NewRepository() Repository {
  return &repository{}
}

func (r *repository) GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error) {
  activities := []*Activity{}

  rows, err := database.Instance.Query(ctx, "SELECT * FROM Activities LIMIT $1 OFFSET $2", limit, offset)

  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var activity Activity

    if err := rows.StructScan(&activity); err != nil {
      return nil, err
    }

    activities = append(activities, &activity)
  }

  return activities, nil
}

func (r *repository) GetSegments(ctx context.Context, activityId int64) ([]*Segment, error) {
  segments := []*Segment{}

  rows, err := database.Instance.Query(ctx, "SELECT id, name, elapsedtime, movingtime, distance FROM activitysegment WHERE activityid = $1", activityId)

  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var segment Segment

    if err := rows.StructScan(&segment); err != nil {
      return nil, err
    }

    segments = append(segments, &segment)
  }

  return segments, nil
}

func (r *repository) GetSplits(ctx context.Context, activityId int64) ([]*Split, error) {
  splits := []*Split{}

  rows, err := database.Instance.Query(ctx, "SELECT id, distance, elapsedtime, movingtime, elevationdifference, averagespeed FROM activitysplit WHERE activityid = $1", activityId)

  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var split Split

    if err := rows.StructScan(&split); err != nil {
      return nil, err
    }

    splits = append(splits, &split)
  }

  return splits, nil
}

func (r *repository) GetActivityById(ctx context.Context, id string) (*Activity, error) {
  // doc, err := r.collection.Doc(id).Get(ctx)
  //
  // if status.Code(err) == codes.NotFound {
  //   log.Println("Not found")
  // }
  //
  // var activity Activity
  //
  // err = doc.DataTo(&activity)
  //
  // if err != nil {
  //   return nil, err
  // }
  //
  // return &activity, nil
  return nil, errors.New("not implemented")

}

func (r *repository) GetActivityByStravaId(ctx context.Context, id int64) (*Activity, error) {
  row := database.Instance.QueryRow(ctx, "SELECT id FROM activities WHERE stravaid = $1", id)
  var activity Activity
  if err := row.StructScan(&activity); err != nil {
    return nil, err
  }
  return &activity, nil
}

func (r *repository) UpsertActivity(ctx context.Context, activity *CreateActivityRequest) (int64, error) {
  result, err := database.Instance.NamedQueryRow(
    ctx,
    `INSERT INTO activities 
    (stravaid, type, name, description, distance, movingtime, elapsedtime, totalelevationgain, startdate, startdatelocal, gearname, mappolyline, dateadded, datemodified)
    VALUES (:stravaid, :type, :name, :description, :distance, :movingtime, :elapsedtime, :totalelevationgain, :startdate, :startdatelocal, :gearname, :mappolyline, :dateadded, :datemodified)
    ON CONFLICT (stravaid) DO UPDATE SET name = :name, description = :description RETURNING id;`,
    activity,
  )

  if err != nil {
    return 0, err
  }
  var id int64
  if err := result.Scan(&id); err != nil {
    return 0, err
  }
  return id, nil
}
