package database

import (
  "context"
  "database/sql"
  "fmt"
  _ "github.com/lib/pq"
  "os"
  "time"
)

type Client interface {
  Query(ctx context.Context, query string, args ...any) (*sql.Rows, error)
  QueryRow(ctx context.Context, query string, args ...any) *sql.Row
  Exec(ctx context.Context, query string, args ...any) (sql.Result, error)
}

type clientImpl struct {
  db *sql.DB
}

var Instance *clientImpl

func getDbConn() string {
  return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
    os.Getenv("DB_USERNAME"),
    os.Getenv("DB_PASSWORD"),
    os.Getenv("DB_HOST"),
    os.Getenv("DB_PORT"),
    os.Getenv("DB_NAME"))
}

func Init() error {
  db, err := sql.Open("postgres", getDbConn())

  if err != nil {
    return err
  }

  ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)

  defer cancel()

  if err = db.PingContext(ctx); err != nil {
    return err
  }

  Instance = &clientImpl{
    db: db,
  }

  if err := CreateMigrationsTable(); err != nil {
    return err
  }

  if err := RunMigrations(); err != nil {
    return err
  }

  return nil
}

func (c *clientImpl) Query(ctx context.Context, query string, args ...any) (*sql.Rows, error) {
  rows, err := c.db.QueryContext(ctx, query, args...)

  if err != nil {
    return nil, err
  }
  return rows, nil
}

func (c *clientImpl) QueryRow(ctx context.Context, query string, args ...any) *sql.Row {
  return c.db.QueryRowContext(ctx, query, args...)

}

func (c *clientImpl) Exec(ctx context.Context, query string, args ...any) (sql.Result, error) {
  return c.db.ExecContext(ctx, query, args...)
}
