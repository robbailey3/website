package validation

import (
	"errors"
	"github.com/robbailey3/website-api/slices"
	"mime/multipart"
	"net/http"
)

type ImageValidator interface {
	WithAllowedFileTypes(fileTypes []string) ImageValidator
	WithMaxFileSize(maxSize int64) ImageValidator
	IsValid(fileHeader *multipart.FileHeader, file []byte) error
}

type imageValidator struct {
	allowedFileTypes []string
	maxImageSize     int64
}

func NewImageValidator() ImageValidator {
	return &imageValidator{}
}

func (i *imageValidator) WithAllowedFileTypes(fileTypes []string) ImageValidator {
	i.allowedFileTypes = fileTypes
	return i
}

func (i *imageValidator) WithMaxFileSize(maxSize int64) ImageValidator {
	i.maxImageSize = maxSize
	return i
}

func (i *imageValidator) IsValid(fileHeader *multipart.FileHeader, file []byte) error {
	detectedContentType := http.DetectContentType(file)

	if !slices.Contains(i.allowedFileTypes, detectedContentType) {
		return errors.New("invalid file type")
	}

	if fileHeader.Size > i.maxImageSize {
		return errors.New("invalid file size")
	}

	return nil
}
