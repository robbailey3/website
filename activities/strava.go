package activities

import (
  "context"
  "encoding/json"
  "fmt"
  "github.com/gookit/slog"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/activities/auth"
  "github.com/robbailey3/website-api/secrets"
  "io"
  "net/http"
  "time"
)

type StravaApiService interface {
  GetActivity(ctx context.Context, id int) (*StravaActivity, error)
  WebhookIsValid(req WebhookChallengeRequest) bool
}

type stravaApiService struct {
  baseUrl     string
  authService auth.Service
  verifyToken string
}

func NewStravaService(authService auth.Service) StravaApiService {
  ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
  defer cancel()
  stravaVerify, err := secrets.GetSecret(ctx, "STRAVA_VERIFY_TOKEN")
  if err != nil {
    slog.Warn(errors.Wrap(err, "Failed to get Webhook verify token"))
  }
  return &stravaApiService{
    baseUrl:     "https://www.strava.com/api/v3",
    authService: authService,
    verifyToken: stravaVerify,
  }
}

func (s *stravaApiService) GetActivity(ctx context.Context, id int) (*StravaActivity, error) {
  client := &http.Client{}
  url := fmt.Sprintf("%s/activities/%d", s.baseUrl, id)

  req, err := http.NewRequest("GET", url, nil)

  if err != nil {
    return nil, err
  }

  accessToken, err := s.authService.GetAccessToken()
  if err != nil {
    slog.Error(err)
    return nil, err
  }
  req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", accessToken))

  resp, err := client.Do(req)

  if err != nil {
    return nil, err
  }

  if resp.StatusCode != 200 {
    return nil, errors.New(fmt.Sprintf("HTTP Status code did not indicate success: %s", resp.Status))
  }

  var activity StravaActivity

  respStr, err := io.ReadAll(resp.Body)

  if err != nil {
    return nil, err
  }

  if err := json.Unmarshal(respStr, &activity); err != nil {
    return nil, err
  }

  return &activity, nil
}

func (s *stravaApiService) WebhookIsValid(req WebhookChallengeRequest) bool {
  if req.HubMode != "subscribe" {
    return false
  }
  if req.HubVerify != s.verifyToken {
    return false
  }
  return true
}
