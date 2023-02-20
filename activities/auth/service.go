package auth

import (
  "context"
  "encoding/json"
  "fmt"
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
  repository            Repository
}

func NewService(secretsClient secrets.Client) (Service, error) {
  clientSecret, err := getClientSecret(secretsClient)
  if err != nil {
    return nil, err
  }
  clientId, err := getClientId(secretsClient)
  if err != nil {
    return nil, err
  }

  s := &service{
    stravaClientSecret: clientSecret,
    stravaClientId:     clientId,
    repository:         NewRepository(),
  }

  go func() {
    ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
    defer cancel()

    refreshToken, err := s.repository.GetRefreshToken(ctx)

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
  if err := s.RefreshAccessToken(); err != nil {
    return "", err
  }
  if s.accessTokenIsValid() {
    return s.accessToken, nil
  }
  return "", errors.New("Access token not valid")
}

func (s *service) RefreshAccessToken() error {
  client := http.Client{}
  req, err := http.NewRequest("POST", "https://www.strava.com/oauth/token", nil)
  if err != nil {
    return err
  }
  req.Header.Add("content-type", "application/json")
  q := req.URL.Query()
  q.Set("client_id", s.stravaClientId)
  q.Set("client_secret", s.stravaClientSecret)
  q.Set("refresh_token", s.refreshToken)
  q.Set("grant_type", "refresh_token")
  q.Set("scopes", "activity:read")
  req.URL.RawQuery = q.Encode()

  response, err := client.Do(req)
  if err != nil {
    return err
  }
  if response.StatusCode != 200 {
    return errors.New(fmt.Sprintf("Failed to authenticate with strava: %s", response.Status))
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
  if err := s.repository.SetRefreshToken(ctx, s.refreshToken); err != nil {
    return err
  }
  return nil
}

func getClientSecret(secretsClient secrets.Client) (string, error) {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
  defer cancel()
  clientSecret, err := secretsClient.GetSecret(ctx, "STRAVA_CLIENT_SECRET")
  if err != nil {
    return "", err
  }
  return clientSecret, nil
}

func getClientId(secretsClient secrets.Client) (string, error) {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
  defer cancel()
  clientId, err := secretsClient.GetSecret(ctx, "STRAVA_CLIENT_ID")
  if err != nil {
    return "", err
  }
  return clientId, nil
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
