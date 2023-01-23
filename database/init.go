package database

import (
  "context"
  "database/sql"
  "fmt"
  "github.com/jmoiron/sqlx"
  _ "github.com/lib/pq"
  "os"
  "time"
)

type Client interface {
  Query(ctx context.Context, query string, args ...any) (*sql.Rows, error)
  QueryRow(ctx context.Context, query string, args ...any) *sql.Row
  NamedQueryRow(ctx context.Context, query string, arg interface{}) *sql.Row
  Exec(ctx context.Context, query string, args ...any) (sql.Result, error)
  NamedExec(ctx context.Context, query string, arg interface{}) (sql.Result, error)
}

type clientImpl struct {
  db *sqlx.DB
}

var Instance *clientImpl

func getDbConn() string {
  sslStr := ""
  disabledSSLMode := os.Getenv("DB_SSL_DISABLED") == "true"
  if disabledSSLMode {
    sslStr = "sslmode=disable"
  }
  return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?%s",
    os.Getenv("DB_USERNAME"),
    os.Getenv("DB_PASSWORD"),
    os.Getenv("DB_HOST"),
    os.Getenv("DB_PORT"),
    os.Getenv("DB_NAME"),
    sslStr)
}

func Init() error {
  db, err := sqlx.Open("postgres", getDbConn())

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

func (c *clientImpl) Query(ctx context.Context, query string, args ...any) (*sqlx.Rows, error) {
  rows, err := c.db.QueryxContext(ctx, query, args...)

  if err != nil {
    return nil, err
  }
  return rows, nil
}

func (c *clientImpl) QueryRow(ctx context.Context, query string, args ...any) *sqlx.Row {
  return c.db.QueryRowxContext(ctx, query, args...)
}

func (c *clientImpl) NamedQueryRow(ctx context.Context, query string, arg interface{}) (*sqlx.Row, error) {
  q, err := c.db.PrepareNamedContext(ctx, query)
  if err != nil {
    return nil, err
  }
  return q.QueryRow(arg), nil
}

func (c *clientImpl) Exec(ctx context.Context, query string, args ...any) (sql.Result, error) {
  return c.db.ExecContext(ctx, query, args...)
}

func (c *clientImpl) NamedExed(ctx context.Context, query string, arg interface{}) (sql.Result, error) {
  return c.db.NamedExecContext(ctx, query, arg)
}
