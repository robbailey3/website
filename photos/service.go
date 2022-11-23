package photos

import (
	"context"
	"github.com/robbailey3/website-api/slices"
	"github.com/robbailey3/website-api/storage"
	"log"
	"mime/multipart"
	"os"
)

var allowedFileTypes = []string{"image/jpeg"}

var maxFileSize = int64(10 * 1024 * 1024)

type Service interface {
	GetPhotos(ctx context.Context, request *GetPhotosRequest) ([]*Photo, error)
	GetPhoto(ctx context.Context, id string) error
	IsValidType(file *multipart.FileHeader) bool
	IsValidSize(file *multipart.FileHeader) bool
}

type service struct {
	repository    Repository
	storageClient storage.Client
}

func NewService(repo Repository) Service {
	storageClient, err := storage.NewClient(os.Getenv("PHOTO_BUCKET_NAME"))

	if err != nil {
		// TOOD: Handle this error
		log.Fatal(err)
	}

	return &service{repository: repo, storageClient: storageClient}
}

func (s *service) GetPhotos(ctx context.Context, req *GetPhotosRequest) ([]*Photo, error) {
	return s.repository.GetMany(ctx, req.Limit, req.Offset)
}

func (s *service) GetPhoto(ctx context.Context, id string) error {
	photo, err := s.repository.GetPhoto(ctx, id)

	if err != nil {
		return err
	}

	file, err := s.storageClient.GetFile(ctx, photo.StoragePath)

	if err != nil {
		return err
	}

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
