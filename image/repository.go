package image

import (
  "context"
  sq "github.com/Masterminds/squirrel"
  "github.com/robbailey3/website-api/database"
)

type Repository interface {
  Insert(ctx context.Context, image *AiImage) (*int64, error)
  GetById(ctx context.Context, id int64) (*AiImage, error)
}

type repository struct {
  psql sq.StatementBuilderType
}

func NewRepository() Repository {
  return &repository{
    psql: sq.StatementBuilder.PlaceholderFormat(sq.Dollar),
  }
}

func (r *repository) GetById(ctx context.Context, id int64) (*AiImage, error) {
  var image AiImage
  query, args, _ := r.psql.Select("*").From("AiImages").Where(sq.Eq{"id": id}).ToSql()
  row := database.Instance.QueryRow(ctx, query, args...)

  if err := row.StructScan(&image); err != nil {
    return nil, err
  }

  return &image, nil
}

func (r *repository) Insert(ctx context.Context, image *AiImage) (*int64, error) {
  query, args, _ := r.psql.Insert("AiImages").Columns("Path", "DateAdded", "ExpiryTime").Values(image.Path, image.DateAdded, image.ExpiryTime).ToSql()
  result, err := database.Instance.Exec(ctx, query, args...)

  if err != nil {
    return nil, err
  }

  id, err := result.LastInsertId()

  if err != nil {
    return nil, err
  }
  return &id, nil
}
