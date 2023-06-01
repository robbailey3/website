package auth

import (
  "context"
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
}

func (r repositoryImpl) GetRefreshToken(ctx context.Context) (string, error) {
  // TODO implement me
  panic("implement me")
}

func (r repositoryImpl) SetRefreshToken(ctx context.Context, token string) error {
  // TODO implement me
  panic("implement me")
}

func NewRepository() Repository {
  return &repositoryImpl{}
}
