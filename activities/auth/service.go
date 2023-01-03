package auth

import (
  "context"
  "github.com/robbailey3/website-api/secrets"
)

type Service interface {
  GetAuthToken() (string, error)
}

type service struct {
  refreshToken string
  authToken    string
}

func (s *service) GetAuthToken() (string, error) {
  return "", nil
}

func (s *service) saveRefreshToken(ctx context.Context, token string) error {
  return secrets.UpdateSecret(ctx, "STRAVA_REFRESH_TOKEN", token)
}

func (s *service) getRefreshToken(ctx context.Context) (string, error) {
  return secrets.GetSecret(ctx, "STRAVA_REFRESH_TOKEN")
}
