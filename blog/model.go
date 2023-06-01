package blog

import (
  "go.mongodb.org/mongo-driver/bson/primitive"
  "time"
)

type Post struct {
  Id           primitive.ObjectID `json:"id" bson:"_id"`
  Title        string             `json:"title" bson:"title"`
  Content      string             `json:"content" bson:"content"`
  DateAdded    time.Time          `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time          `json:"dateModified" bson:"dateModified"`
}

type PostDto struct {
  Title        string    `json:"title" bson:"title"`
  Content      string    `json:"content" bson:"content"`
  DateAdded    time.Time `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time `json:"dateModified" bson:"dateModified"`
}

type PostViewModel struct {
  Id           string    `json:"id"`
  Title        string    `json:"title"`
  Content      string    `json:"content"`
  DateAdded    time.Time `json:"dateAdded"`
  DateModified time.Time `json:"dateModified"`
}
