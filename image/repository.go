package image

import (
  "context"
  sq "github.com/Masterminds/squirrel"
  "github.com/google/uuid"
  "github.com/robbailey3/website-api/database"
)

type Repository interface {
  Insert(ctx context.Context, image *AiImage) (*uuid.UUID, error)
  GetById(ctx context.Context, guid uuid.UUID) (*AiImage, error)
}

type repository struct {
  psql sq.StatementBuilderType
}

func NewRepository() Repository {
  return &repository{
    psql: sq.StatementBuilder.PlaceholderFormat(sq.Dollar),
  }
}

func (r *repository) GetById(ctx context.Context, guid uuid.UUID) (*AiImage, error) {
  var image AiImage
  query, args, _ := r.psql.Select("*").From("AiImages").Where(sq.Eq{"Guid": guid}).ToSql()
  row := database.Instance.QueryRow(ctx, query, args...)

  if err := row.StructScan(&image); err != nil {
    return nil, err
  }

  return &image, nil
}

func (r *repository) Insert(ctx context.Context, image *AiImage) (*uuid.UUID, error) {
  query, args, _ := r.psql.Insert("AiImages").Columns("Path", "DateAdded", "ExpiryTime", "Guid").Values(image.Path, image.DateAdded, image.ExpiryTime, image.Guid).ToSql()
  _, err := database.Instance.Exec(ctx, query, args...)

  if err != nil {
    return nil, err
  }

  return &image.Guid, nil
}
