package photos

import (
	"github.com/robbailey3/website-api/slices"
	"mime/multipart"
)

var allowedFileTypes = []string{"image/jpeg"}

var maxFileSize = int64(10 * 1024 * 1024)

type Service interface {
	IsValidType(file *multipart.FileHeader) bool
	IsValidSize(file *multipart.FileHeader) bool
}

type service struct {
	repository Repository
}

func NewService(repo Repository) Service {
	return &service{repository: repo}
}

func (s *service) IsValidType(file *multipart.FileHeader) bool {
	contentType := file.Header.Get("Content-Type")

	if !slices.Contains(allowedFileTypes, contentType) {
		return false
	}

	return true
}

func (s *service) IsValidSize(file *multipart.FileHeader) bool {
	return file.Size < maxFileSize
}
