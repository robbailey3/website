package audit

import (
  "context"
  "github.com/robbailey3/website-api/database"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo/options"
)

type Repository interface {
  GetAuditLogs(ctx context.Context, limit, skip int) ([]AuditLog, error)
  InsertAuditLog(ctx context.Context, log *AuditLog) error
}

type repositoryImpl struct {
  client database.Client
}

func (r repositoryImpl) GetAuditLogs(ctx context.Context, limit, skip int) ([]AuditLog, error) {
  cursor, err := r.client.Find(ctx, bson.M{}, options.Find().SetSkip(int64(skip)).SetLimit(int64(limit)))

  if err != nil {
    return nil, err
  }

  var results []AuditLog

  if err := cursor.All(ctx, &results); err != nil {
    return nil, err
  }

  return results, nil
}

func (r repositoryImpl) InsertAuditLog(ctx context.Context, log *AuditLog) error {
  _, err := r.client.Insert(ctx, log)

  return err
}

func NewRepository() Repository {
  return &repositoryImpl{client: database.NewClient("audit")}
}
