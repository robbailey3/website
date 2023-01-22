package tasks

import (
  "context"
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
}

func NewRepository() Repository {
  return &repository{}
}

func (r *repository) Get(ctx context.Context) ([]*Task, error) {
  var tasks []*Task

  rows, err := database.Instance.Query(ctx, "SELECT * FROM tasks")

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

  if _, err := database.Instance.Exec(
    ctx,
    "INSERT INTO tasks ( title, completed, dateadded, datemodified) VALUES ($1, $2, $3, $4)",
    task.Title,
    task.Completed,
    task.DateAdded,
    task.DateModified,
  ); err != nil {
    return err
  }
  return nil
}

func (r *repository) Update(ctx context.Context, id int64, title string, completed bool) error {
  _, err := database.Instance.Exec(
    ctx,
    "UPDATE tasks SET title = $1, completed = $2, datemodified = $3 WHERE id = $4",
    title,
    completed,
    time.Now(),
    id)

  return err
}

func (r *repository) Delete(ctx context.Context, id int64) error {
  _, err := database.Instance.Exec(ctx, "DELETE FROM tasks WHERE id = $1", id)

  return err
}
