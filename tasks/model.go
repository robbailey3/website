package tasks

import (
	"time"
)

type Task struct {
	Id           string    `json:"id,omitempty" firestore:"-"`
	Title        string    `json:"title"`
	Completed    bool      `json:"completed"`
	DateAdded    time.Time `json:"dateAdded"`
	DateModified time.Time `json:"dateModified"`
}
