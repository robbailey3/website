package blog

import "time"

type Post struct {
	Title        string    `json:"title"`
	Content      string    `json:"content"`
	DateAdded    time.Time `json:"dateAdded"`
	DateModified time.Time `json:"dateModified"`
}
