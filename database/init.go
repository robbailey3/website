package database

import (
  "context"
  "database/sql"
  "fmt"
  _ "github.com/lib/pq"
  "time"
)

type Client interface {
  Query(query string, args ...string) (interface{}, error)
}

type clientImpl struct {
  db *sql.DB
}

var Instance *clientImpl

func getDbConn() string {
  return fmt.Sprintf("postgres://%s:%s@%s:%d?sslmode=disable", "", "", "", 5432)
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

  return nil
}

func (c *clientImpl) Query(result interface{}, query string, args ...string) error {
  rows, err := c.db.Query(query, args)

  if err != nil {
    return err
  }

  if err := rows.Scan(result); err != nil {
    return err
  }

  return nil
}
