package database

import (
  "context"
  "database/sql"
  "fmt"
  "github.com/lib/pq"
  _ "github.com/lib/pq"
  "os"
  "time"
)

type Client interface {
  Query(ctx context.Context, result interface{}, query string, args ...any) error
  Exec(ctx context.Context, query string, args ...any) error
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

func (c *clientImpl) Query(ctx context.Context, result []any, query string, args ...any) error {
  if args == nil {
    rows, err := c.db.QueryContext(ctx, query)
    if err != nil {
      return err
    }
    for rows.Next() {
      var row any
      err := rows.Scan(&row)
      
    }

    if err := rows.Scan(result); err != nil {
      return err
    }
  } else {
    rows, err := c.db.QueryContext(ctx, query, pq.Array(args))
    if err != nil {
      return err
    }
    if err := rows.Scan(result); err != nil {
      return err
    }
  }

  return nil
}

func (c *clientImpl) Exec(ctx context.Context, query string, args ...any) error {
  _, err := c.db.ExecContext(ctx, query, args)

  if err != nil {
    return err
  }

  return nil
}
