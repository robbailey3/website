package auth

import (
  "bytes"
  "context"
  "encoding/json"
  "github.com/gookit/slog"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/secrets"
  "io"
  "net/http"
  "time"
)

type Service interface {
  GetAccessToken() (string, error)
}

type service struct {
  refreshToken          string
  accessToken           string
  accessTokenExpiryTime time.Time
  stravaClientSecret    string
  stravaClientId        string
}

func NewService() (Service, error) {
  clientSecret, err := getClientSecret()
  if err != nil {
    return nil, err
  }
  clientId, err := getClientId()
  if err != nil {
    return nil, err
  }

  s := &service{
    stravaClientSecret: clientSecret,
    stravaClientId:     clientId,
  }

  go func() {
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()

    refreshToken, err := s.getRefreshToken(ctx)

    if err != nil {
      slog.Warn(errors.Wrap(err, "Failed to get refresh token from store"))
    }

    s.refreshToken = refreshToken
  }()

  return s, nil
}

func (s *service) GetAccessToken() (string, error) {
  if s.accessTokenIsValid() {
    return s.accessToken, nil
  }
  return "", nil
}

func (s *service) RefreshAccessToken() error {
  req := &GetAuthTokenRequest{
    Params: GetAuthTokenRequestParams{
      ClientId:     s.stravaClientId,
      ClientSecret: s.stravaClientSecret,
      RefreshToken: s.refreshToken,
      GrantType:    "refresh_token",
      Scopes:       "activity:read",
    },
  }
  httpBodyBytes, err := json.Marshal(req)
  if err != nil {
    return err
  }
  body := bytes.NewBuffer(httpBodyBytes)
  response, err := http.Post("https://www.strava.com/oauth/token", "application/json", body)
  if err != nil {
    return err
  }
  responseBytes, err := io.ReadAll(response.Body)

  var authResponse TokenResponse
  if err := json.Unmarshal(responseBytes, &authResponse); err != nil {
    return err
  }

  s.accessToken = authResponse.AccessToken
  s.accessTokenExpiryTime = time.Unix(authResponse.ExpiresAt, 0)
  s.refreshToken = authResponse.RefreshToken

  ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
  defer cancel()
  if err := s.saveRefreshToken(ctx, s.refreshToken); err != nil {
    return err
  }
  return nil
}

func getClientSecret() (string, error) {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
  defer cancel()
  clientSecret, err := secrets.GetSecret(ctx, "STRAVA_CLIENT_SECRET")
  if err != nil {
    return "", err
  }
  return clientSecret, nil
}

func getClientId() (string, error) {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
  defer cancel()
  clientId, err := secrets.GetSecret(ctx, "STRAVA_CLIENT_ID")
  if err != nil {
    return "", err
  }
  return clientId, nil
}

func (s *service) saveRefreshToken(ctx context.Context, token string) error {
  return secrets.UpdateSecret(ctx, "STRAVA_REFRESH_TOKEN", token)
}

func (s *service) getRefreshToken(ctx context.Context) (string, error) {
  return secrets.GetSecret(ctx, "STRAVA_REFRESH_TOKEN")
}

func (s *service) accessTokenIsValid() bool {
  if s.accessToken == "" {
    return false
  }
  if s.accessTokenExpiryTime.Before(time.Now()) {
    return false
  }
  return true
}
