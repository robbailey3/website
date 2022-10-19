package validation

import (
	"github.com/robbailey3/website-api/slices"
	"mime/multipart"
	"net/http"
)

type ImageValidator interface {
	WithAllowedFileTypes(fileTypes []string) ImageValidator
	WithMaxFileSize(maxSize int64) ImageValidator
	IsValid(fileHeader *multipart.FileHeader, file []byte) bool
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

func (i *imageValidator) IsValid(fileHeader *multipart.FileHeader, file []byte) bool {
	detectedContentType := http.DetectContentType(file)

	if !slices.Contains(i.allowedFileTypes, detectedContentType) {
		return false
	}

	return fileHeader.Size < i.maxImageSize
}
