package blog

import (
  "context"
  "database/sql"
  sq "github.com/Masterminds/squirrel"
  "github.com/robbailey3/website-api/database"
  "github.com/robbailey3/website-api/exception"
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
  psql sq.StatementBuilderType
}

func NewRepository() Repository {
  return &repository{
    psql: sq.StatementBuilder.PlaceholderFormat(sq.Dollar),
  }
}

func (r *repository) GetMany(ctx context.Context, limit, offset int) ([]Post, error) {
  var posts []Post

  query, _, _ := r.psql.Select("*").From("blog").Limit(uint64(limit)).Offset(uint64(offset)).ToSql()
  rows, err := database.Instance.Query(ctx, query)

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
  query, args, _ := r.psql.Select("*").From("blog").Where(sq.Eq{"id": id}).ToSql()
  row := database.Instance.QueryRow(ctx, query, args...)

  var post Post

  if err := row.StructScan(&post); err != nil {
    if err == sql.ErrNoRows {
      return nil, exception.NotFound()
    }
    return nil, err
  }

  return &post, nil
}

func (r *repository) UpdateOne(ctx context.Context, id int64, update *UpdatePostRequest) error {
  query, args, _ := r.psql.Update("blog").Set("title", update.Title).Set("content", update.Content).Set("datemodified", time.Now()).Where("id", id).ToSql()
  _, err := database.Instance.Exec(ctx, query, args...)

  return err
}

func (r *repository) Insert(ctx context.Context, post *PostDto) error {
  query, args, _ := r.psql.Insert("blog").Columns("title", "content", "dateadded", "datemodified").Values(post.Title, post.Content, post.DateAdded, post.DateModified).ToSql()
  _, err := database.Instance.Exec(ctx, query, args)

  return err
}

func (r *repository) Delete(ctx context.Context, id int64) error {
  query, args, _ := r.psql.Delete("blog").Where(sq.Eq{"id": id}).ToSql()
  _, err := database.Instance.Exec(ctx, query, args)

  return err
}
