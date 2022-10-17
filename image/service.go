package image

import (
	"cloud.google.com/go/firestore"
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	"github.com/robbailey3/website-api/storage"
	"io"
	"log"
	"mime/multipart"
	"os"
	"strings"
	"time"
	"unsafe"
)

type Service interface {
	CreateImage(ctx context.Context, fileHeader *multipart.FileHeader) (*string, error)
	GetImageLabels(ctx context.Context, id string) ([]*Label, error)
}

type service struct {
	repo    Repository
	storage storage.Client
	vision  VisionAiClient
}

func NewService(db *firestore.Client) Service {
	storageClient, err := storage.NewClient(os.Getenv("IMAGE_AI_BUCKET_NAME"))
	if err != nil {
		log.Fatal("Failed to initialise storage client")
	}
	visionClient, err := NewVisionClient()
	if err != nil {
		log.Fatal("Failed to initialise visionAi client")
	}
	return &service{
		repo:    NewRepository(db),
		storage: storageClient,
		vision:  visionClient,
	}
}

func (s *service) GetImageLabels(ctx context.Context, id string) ([]*Label, error) {
	imageReader, err := s.getImageById(ctx, id)

	if err != nil {
		return nil, err
	}

	return s.vision.DetectLabels(ctx, imageReader, 10)
}

func (s *service) CreateImage(ctx context.Context, fileHeader *multipart.FileHeader) (*string, error) {
	fileExt := strings.Split(fileHeader.Filename, ".")[1] // TODO: make this more robust

	fileName := fmt.Sprintf("%s.%s", s.generateRandomFilename(), fileExt)

	file, err := fileHeader.Open()

	if err != nil {
		return nil, err
	}

	if err = s.storage.Upload(ctx, fileName, file); err != nil {
		return nil, err
	}

	id, err := s.repo.Insert(ctx, &AiImage{
		DateAdded: time.Now(),
		Path:      fileName,
	})

	if err != nil {
		return nil, err
	}

	return id, nil
}

func (s *service) isValidImage(fileheader *multipart.FileHeader) bool {
	// TODO: Implement me
	return true
}

func (s *service) generateRandomFilename() string {
	var alphabet = []byte("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]byte, 32)
	rand.Read(b)
	for i := 0; i < 32; i++ {
		b[i] = alphabet[b[i]%byte(len(alphabet))]
	}
	return *(*string)(unsafe.Pointer(&b))
}

func (s *service) getImageById(ctx context.Context, id string) (io.Reader, error) {
	img, err := s.repo.GetById(ctx, id)

	if err != nil {
		return nil, err
	}

	if img == nil {
		return nil, errors.New("image not found")
	}

	reader, err := s.storage.GetFile(ctx, img.Path)

	if err != nil {
		return nil, err
	}

	return reader, nil
}
