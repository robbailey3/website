package image

import (
  "context"
  "github.com/robbailey3/website-api/database"
)

type Repository interface {
  Insert(ctx context.Context, image *AiImage) (*int64, error)
  GetById(ctx context.Context, id int64) (*AiImage, error)
}

type repository struct {
}

func NewRepository() Repository {
  return &repository{}
}

func (r *repository) GetById(ctx context.Context, id int64) (*AiImage, error) {
  var image AiImage

  row := database.Instance.QueryRow(ctx, "SELECT * FROM AiImages WHERE Id = $1", id)

  if err := row.Scan(&image); err != nil {
    return nil, err
  }

  return &image, nil
}

func (r *repository) Insert(ctx context.Context, image *AiImage) (*int64, error) {
  result, err := database.Instance.Exec(ctx, "INSERT INTO AiImages (Path, DateAdded, ExpiryTime) VALUES ($1, $2, $3)")

  if err != nil {
    return nil, err
  }

  id, err := result.LastInsertId()

  if err != nil {
    return nil, err
  }
  return &id, nil
}
