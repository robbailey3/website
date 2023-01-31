package auth

import (
  "context"
  sq "github.com/Masterminds/squirrel"
  "github.com/robbailey3/website-api/database"
)

type RefreshTokenGetter interface {
  GetRefreshToken(ctx context.Context) (string, error)
}

type RefreshTokenSetter interface {
  SetRefreshToken(ctx context.Context, token string) error
}

type Repository interface {
  RefreshTokenGetter
  RefreshTokenSetter
}

type repositoryImpl struct {
  psql sq.StatementBuilderType
}

func NewRepository() Repository {
  return &repositoryImpl{
    psql: sq.StatementBuilder.PlaceholderFormat(sq.Dollar),
  }
}

func (r *repositoryImpl) GetRefreshToken(ctx context.Context) (string, error) {
  sql, _, _ := r.psql.Select("token").From("StravaRefreshTokens").Limit(1).ToSql()

  row := database.Instance.QueryRow(ctx, sql)

  var token string

  if err := row.Scan(&token); err != nil {
    return "", err
  }

  return token, nil
}

func (r *repositoryImpl) SetRefreshToken(ctx context.Context, token string) error {
  sql, args, _ := r.psql.Update("StravaRefreshTokens").Set("token", token).Where(sq.Eq{"id": 1}).ToSql()
  if _, err := database.Instance.Exec(ctx, sql, args...); err != nil {
    return err
  }
  return nil
}
