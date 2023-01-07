package activities

import (
  "context"
  "log"
  "time"

  "cloud.google.com/go/firestore"
  "google.golang.org/api/iterator"
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"
)

type Repository interface {
  GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error)
  GetActivityById(ctx context.Context, id string) (*Activity, error)
  GetActivityByStravaId(ctx context.Context, id int64) (*Activity, error)
  UpsertActivity(ctx context.Context, activity *CreateActivityRequest) error
}

type repository struct {
  collection *firestore.CollectionRef
}

func NewRepository(db *firestore.Client) Repository {
  return &repository{collection: db.Collection("activities")}
}

func (r *repository) GetActivities(ctx context.Context, limit, offset int) ([]*Activity, error) {
  activities := []*Activity{}

  docs := r.collection.Limit(10).OrderBy("DateModified", firestore.Desc).
    Limit(limit).
    Offset(offset).
    Documents(ctx)

  for {
    var currentDoc Activity

    doc, err := docs.Next()

    if err == iterator.Done {
      return activities, nil
    }

    if err := doc.DataTo(&currentDoc); err != nil {
      return nil, err
    }

    currentDoc.Id = doc.Ref.ID

    activities = append(activities, &currentDoc)
  }
}

func (r *repository) GetActivityById(ctx context.Context, id string) (*Activity, error) {
  doc, err := r.collection.Doc(id).Get(ctx)

  if status.Code(err) == codes.NotFound {
    log.Println("Not found")
  }

  var activity Activity

  err = doc.DataTo(&activity)

  if err != nil {
    return nil, err
  }

  return &activity, nil
}

func (r *repository) GetActivityByStravaId(ctx context.Context, id int64) (*Activity, error) {
  docs, err := r.collection.Where("StravaId", "==", id).Limit(1).Documents(ctx).GetAll()

  if err != nil {
    return nil, err
  }

  for _, doc := range docs {
    var activity Activity

    if err := doc.DataTo(&activity); err != nil {
      return nil, err
    }
    activity.Id = doc.Ref.ID
    return &activity, nil
  }

  return nil, err
}

func (r *repository) UpsertActivity(ctx context.Context, activity *CreateActivityRequest) error {
  existingDoc, err := r.GetActivityByStravaId(ctx, activity.StravaId)

  if err != nil {
    return err
  }
  activity.DateAdded = time.Now()
  activity.DateModified = time.Now()
  if existingDoc != nil {
    _, err := r.collection.Doc(existingDoc.Id).Set(ctx, map[string]interface{}{
      "Name":        activity.Name,
      "Description": activity.Description,
    }, firestore.MergeAll)
    if err != nil {
      return err
    }
  }
  _, _, err = r.collection.Add(ctx, activity)
  if err != nil {
    return err
  }
  return nil
}
