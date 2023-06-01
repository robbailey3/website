package blog

import "time"

type Post struct {
  Id           int64     `json:"id" bson:"_id"`
  Title        string    `json:"title" bson:"title"`
  Content      string    `json:"content" bson:"content"`
  DateAdded    time.Time `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time `json:"dateModified" bson:"dateModified"`
}

type PostDto struct {
  Title        string    `json:"title" bson:"title"`
  Content      string    `json:"content" bson:"content"`
  DateAdded    time.Time `json:"dateAdded" bson:"dateAdded"`
  DateModified time.Time `json:"dateModified" bson:"dateModified"`
}

type PostViewModel struct {
  Id           int64     `json:"id"`
  Title        string    `json:"title"`
  Content      string    `json:"content"`
  DateAdded    time.Time `json:"dateAdded"`
  DateModified time.Time `json:"dateModified"`
}
