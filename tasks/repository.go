package tasks

import (
  "context"
  sq "github.com/Masterminds/squirrel"
  "github.com/robbailey3/website-api/database"
  "time"
)

type Repository interface {
  Get(ctx context.Context) ([]*Task, error)
  Create(ctx context.Context, task *Task) error
  Update(ctx context.Context, id int64, title string, completed bool) error
  Delete(ctx context.Context, id int64) error
}

type repository struct {
  psql sq.StatementBuilderType
}

func NewRepository() Repository {
  return &repository{
    psql: sq.StatementBuilder.PlaceholderFormat(sq.Dollar),
  }
}

func (r *repository) Get(ctx context.Context) ([]*Task, error) {
  var tasks []*Task
  query, _, _ := r.psql.Select("*").From("tasks").ToSql()
  rows, err := database.Instance.Query(ctx, query)

  if err != nil {
    return nil, err
  }

  for rows.Next() {
    var task Task

    if err := rows.StructScan(&task); err != nil {
      return nil, err
    }

    tasks = append(tasks, &task)
  }

  return tasks, nil
}

func (r *repository) Create(ctx context.Context, task *Task) error {
  task.DateModified = time.Now()
  task.DateAdded = time.Now()

  query, args, _ := r.psql.Insert("tasks").Columns("title", "completed", "dateadded", "datemodified").Values(task.Title, task.Completed, task.DateAdded, task.DateModified).ToSql()
  if _, err := database.Instance.Exec(
    ctx,
    query,
    args...,
  ); err != nil {
    return err
  }
  return nil
}

func (r *repository) Update(ctx context.Context, id int64, title string, completed bool) error {
  query, args, _ := r.psql.Update("tasks").Set("title", title).Set("completed", completed).Set("datemodified", time.Now()).Where("id", id).ToSql()

  _, err := database.Instance.Exec(
    ctx,
    query,
    args...)

  return err
}

func (r *repository) Delete(ctx context.Context, id int64) error {
  query, args, _ := r.psql.Delete("tasks").Where("id", id).ToSql()

  _, err := database.Instance.Exec(ctx, query, args...)

  return err
}
