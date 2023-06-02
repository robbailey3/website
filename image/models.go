package image

import (
  "time"
)

type AiImage struct {
  Path       string    `json:"path" bson:"path"`
  DateAdded  time.Time `json:"dateAdded" bson:"dateAdded"`
  ExpiryTime time.Time `json:"expiryTime" bson:"expiryTime"`
}

type Label struct {
  Description string  `json:"description" bson:"description"`
  Score       float32 `json:"score" bson:"score"`
}
