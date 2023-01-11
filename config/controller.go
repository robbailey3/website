package config

import (
  "github.com/robbailey3/website-api/response"
  "net/http"
  "os"
)

type Controller interface {
  GetFirebaseConfig(w http.ResponseWriter, req *http.Request)
}

type controller struct{}

func NewController() Controller {
  return &controller{}
}

func (c controller) GetFirebaseConfig(w http.ResponseWriter, req *http.Request) {
  response.Ok(w, firebaseConfig{
    ApiKey:            os.Getenv("FIREBASE_API_KEY"),
    AuthDomain:        os.Getenv("FIREBASE_AUTH_DOMAIN"),
    ProjectId:         os.Getenv("GOOGLE_CLOUD_PROJECT"),
    StorageBucket:     os.Getenv("FIREBASE_STORAGE_BUCKET"),
    MessagingSenderId: os.Getenv("FIREBASE_MESSAGING_SENDER_ID"),
    AppId:             os.Getenv("FIREBASE_APP_ID"),
    MeasurementId:     os.Getenv("FIREBASE_MEASUREMENT_ID"),
  })
}
