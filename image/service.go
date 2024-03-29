package image

import (
  "bytes"
  "context"
  "crypto/rand"
  "errors"
  "fmt"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "io"
  "log"
  "mime/multipart"
  "os"
  "strings"
  "time"
  "unsafe"

  "github.com/jellydator/ttlcache/v3"
  "github.com/robbailey3/website-api/exception"
  "github.com/robbailey3/website-api/validation"
  "google.golang.org/genproto/googleapis/cloud/vision/v1"
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"

  "github.com/robbailey3/website-api/storage"
)

type Service interface {
  CreateImage(ctx context.Context, fileHeader *multipart.FileHeader) (*primitive.ObjectID, error)
  GetImage(xtx context.Context, id primitive.ObjectID) (io.Reader, error)
  GetImageLabels(ctx context.Context, id primitive.ObjectID) ([]*Label, error)
  GetImageProperties(ctx context.Context, id primitive.ObjectID) (*vision.ImageProperties, error)
  GetImageLandmarks(ctx context.Context, id primitive.ObjectID) ([]*vision.EntityAnnotation, error)
  GetImageFaces(ctx context.Context, id primitive.ObjectID) ([]*vision.FaceAnnotation, error)
  GetImageLogos(ctx context.Context, id primitive.ObjectID) ([]*vision.EntityAnnotation, error)
}

type service struct {
  repo    Repository
  storage storage.Client
  vision  VisionAiClient
  cache   *ttlcache.Cache[primitive.ObjectID, []byte]
}

func NewService() Service {
  storageClient, err := storage.NewClient(os.Getenv("IMAGE_AI_BUCKET_NAME"))
  if err != nil {
    log.Fatal("Failed to initialise storage client")
  }
  visionClient, err := NewVisionClient()
  if err != nil {
    log.Fatal("Failed to initialise visionAi client")
  }
  cache := ttlcache.New(
    ttlcache.WithTTL[primitive.ObjectID, []byte](2 * time.Minute))

  go cache.Start()
  return &service{
    repo:    NewRepository(),
    storage: storageClient,
    vision:  visionClient,
    cache:   cache,
  }
}

func (s *service) GetImage(ctx context.Context, id primitive.ObjectID) (io.Reader, error) {
  return s.getImageById(ctx, id)
}

func (s *service) GetImageLabels(ctx context.Context, id primitive.ObjectID) ([]*Label, error) {
  imageReader, err := s.getImageById(ctx, id)

  if err != nil {
    return nil, err
  }

  return s.vision.DetectLabels(ctx, imageReader, 10)
}

func (s *service) GetImageProperties(ctx context.Context, id primitive.ObjectID) (*vision.ImageProperties, error) {
  imageReader, err := s.getImageById(ctx, id)

  if err != nil {
    return nil, err
  }

  return s.vision.DetectProperties(ctx, imageReader)
}

func (s *service) GetImageLandmarks(ctx context.Context, id primitive.ObjectID) ([]*vision.EntityAnnotation, error) {
  imageReader, err := s.getImageById(ctx, id)

  if err != nil {
    return nil, err
  }

  return s.vision.DetectLandmarks(ctx, imageReader, 10)
}

func (s *service) GetImageFaces(ctx context.Context, id primitive.ObjectID) ([]*vision.FaceAnnotation, error) {
  imageReader, err := s.getImageById(ctx, id)

  if err != nil {
    return nil, err
  }

  return s.vision.DetectFaces(ctx, imageReader, 10)
}

func (s *service) GetImageLogos(ctx context.Context, id primitive.ObjectID) ([]*vision.EntityAnnotation, error) {
  imageReader, err := s.getImageById(ctx, id)

  if err != nil {
    return nil, err
  }

  return s.vision.DetectLogos(ctx, imageReader, 10)
}

func (s *service) CreateImage(ctx context.Context, fileHeader *multipart.FileHeader) (*primitive.ObjectID, error) {
  fileExt := strings.Split(fileHeader.Filename, ".")[1] // TODO: make this more robust

  fileName := fmt.Sprintf("%s.%s", s.generateRandomFilename(), fileExt)

  file, err := fileHeader.Open()

  if err != nil {
    return nil, err
  }

  fileBytes, err := io.ReadAll(file)

  if err != nil {
    return nil, err
  }

  if err := validation.NewImageValidator().
    WithAllowedFileTypes([]string{"image/jpeg"}).
    WithMaxFileSize(5*1024*1024).
    IsValid(fileHeader, fileBytes); err != nil {
    return nil, err
  }

  if err = s.storage.Upload(ctx, fileName, bytes.NewReader(fileBytes)); err != nil {
    return nil, err
  }

  id, err := s.repo.Insert(ctx, &AiImage{
    DateAdded:  time.Now(),
    Path:       fileName,
    ExpiryTime: time.Now().Add(time.Hour * 24),
  })

  s.cache.Set(*id, fileBytes, ttlcache.DefaultTTL)

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
  _, err := rand.Read(b)
  if err != nil {
    return ""
  }
  for i := 0; i < 32; i++ {
    b[i] = alphabet[b[i]%byte(len(alphabet))]
  }
  return *(*string)(unsafe.Pointer(&b))
}

func (s *service) getImageById(ctx context.Context, id primitive.ObjectID) (io.Reader, error) {
  cachedImg := s.cache.Get(id, ttlcache.WithDisableTouchOnHit[primitive.ObjectID, []byte]())
  if cachedImg != nil {
    return bytes.NewReader(cachedImg.Value()), nil
  }
  img, err := s.repo.GetById(ctx, id)

  if err != nil {
    if status.Code(err) == codes.NotFound {
      return nil, exception.NotFound()
    }
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
