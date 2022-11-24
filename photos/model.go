package photos

import (
	"time"
)

type Photo struct {
	Id           string    `json:"id"`
	Caption      string    `json:"caption"`
	AltTag       string    `json:"altTag"`
	StoragePath  string    `json:"storagePath"`
	DateAdded    time.Time `json:"dateAdded"`
	DateModified time.Time `json:"dateModified"`
}

type PhotoViewModel struct {
	Id      string `json:"id"`
	Caption string `json:"caption"`
	AltTag  string `json:"altTag"`
}

func (p *Photo) ToViewModel() *PhotoViewModel {
	return &PhotoViewModel{
		Id:      p.Id,
		Caption: p.Caption,
		AltTag:  p.AltTag,
	}
}
