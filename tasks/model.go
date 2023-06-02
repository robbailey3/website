package tasks

import (
  "time"
)

type Task struct {
  Id           string    `json:"id,omitempty" bson:"_id"`
  Title        string    `json:"title" bson:"title"`
  Completed    bool      `json:"completed" bson:"completed"`
  DateAdded    time.Time `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time `json:"dateModified" bson:"dateModified"`
}

type TaskDto struct {
  Title        string    `json:"title" bson:"title"`
  Completed    bool      `json:"completed" bson:"completed"`
  DateAdded    time.Time `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time `json:"dateModified" bson:"dateModified"`
}
