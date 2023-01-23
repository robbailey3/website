package image

import (
  "time"
)

type AiImage struct {
  Id         int64     `json:"id"`
  Path       string    `json:"path"`
  DateAdded  time.Time `json:"dateAdded"`
  ExpiryTime time.Time `json:"expiryTime"`
}

type Label struct {
  Description string  `json:"description"`
  Score       float32 `json:"score"`
}
