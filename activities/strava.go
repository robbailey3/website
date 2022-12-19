package activities

import (
  "context"
  "encoding/json"
  "fmt"
  "io"
  "net/http"
)

type StravaApiService interface {
  GetActivity(ctx context.Context, id string) (*StravaActivity, error)
}

type stravaApiService struct {
  baseUrl string
}

func (s *stravaApiService) GetActivity(ctx context.Context, id string) (*StravaActivity, error) {
  client := &http.Client{}
  url := fmt.Sprintf("https://www.strava.com/api/v3/activities/%s", id)

  req, err := http.NewRequest("GET", url, nil)

  if err != nil {
    return nil, err
  }
  // TODO: Do something to get auth token
  req.Header.Add("Authorization", "")

  resp, err := client.Do(req)

  if err != nil {
    return nil, err
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
