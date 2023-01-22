package activities

import (
  "time"
)

type GetActivitiesRequest struct {
  Limit int `query:"limit" validate:"gte=1,lte=100"`
  Skip  int `query:"skip" validate:"gte=0"`
}

type WebhookChallengeRequest struct {
  HubMode      string `query:"hub.mode"`
  HubChallenge string `query:"hub.challenge"`
  HubVerify    string `query:"hub.verify_token"`
}

type WebhookPostRequest struct {
  AspectType     string `json:"aspect_type"`
  EventTime      int    `json:"event_time"`
  ObjectId       int    `json:"object_id"`
  ObjectType     string `json:"object_type"`
  OwnerId        int    `json:"owner_id"`
  SubscriptionId int    `json:"subscription_id"`
  Updates        struct {
    Title string `json:"title"`
  } `json:"updates"`
}

type CreateActivityRequest struct {
  StravaId           int64     `json:"stravaId"`
  Type               string    `json:"type"`
  Name               string    `json:"name"`
  Description        string    `json:"description"`
  Distance           float64   `json:"distance"`
  MovingTime         int       `json:"movingTime"`
  ElapsedTime        int       `json:"elapsedTime"`
  TotalElevationGain float64   `json:"totalElevationGain"`
  StartDate          time.Time `json:"startDate"`
  StartDateLocal     time.Time `json:"startDateLocal"`
  GearName           string    `json:"gearName"`
  MapPolyline        string    `json:"mapPolyline"`
  DateAdded          time.Time `json:"dateAdded"`
  DateModified       time.Time `json:"dateModified"`
}
