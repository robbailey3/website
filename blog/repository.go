package blog

import (
  "context"
  "github.com/robbailey3/website-api/database"
  "time"
)

type Repository interface {
  GetMany(ctx context.Context, limit, offset int) ([]Post, error)
  GetOne(ctx context.Context, id int64) (*Post, error)
  UpdateOne(ctx context.Context, id int64, update *UpdatePostRequest) error
  Insert(ctx context.Context, post *PostDto) error
  Delete(ctc context.Context, id int64) error
}

type repository struct {
}

func NewRepository() Repository {
  return &repository{}
}

func (r *repository) GetMany(ctx context.Context, limit, offset int) ([]Post, error) {
  var posts []Post

  rows, err := database.Instance.Query(ctx, "SELECT * FROM Blog LIMIT $1 OFFSET $2", limit, offset)

  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var post Post

    if err := rows.StructScan(&post); err != nil {
      return nil, err
    }
    posts = append(posts, post)
  }

  return posts, nil
}

func (r *repository) GetOne(ctx context.Context, id int64) (*Post, error) {
  row := database.Instance.QueryRow(ctx, "SELECT * FROM blog WHERE id = $1", id)

  var post Post

  if err := row.StructScan(&post); err != nil {
    return nil, err
  }

  return &post, nil
}

func (r *repository) UpdateOne(ctx context.Context, id int64, update *UpdatePostRequest) error {
  _, err := database.Instance.Exec(ctx, "UPDATE blog SET title = $1, content = $2, datemodified = $3 WHERE id = $4;", update.Title, update.Content, time.Now(), id)

  return err
}

func (r *repository) Insert(ctx context.Context, post *PostDto) error {
  _, err := database.Instance.Exec(ctx, "INSERT INTO blog (title, content, dateadded, datemodified) VALUES ($1, $2, $3, $4);", post.Title, post.Content, post.DateAdded, post.DateModified)

  return err
}

func (r *repository) Delete(ctx context.Context, id int64) error {
  _, err := database.Instance.Exec(ctx, "DELETE FROM blog WHERE id = $1", id)

  return err
}
