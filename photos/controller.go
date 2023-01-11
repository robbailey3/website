package photos

import (
  "github.com/robbailey3/website-api/image"
  "github.com/robbailey3/website-api/response"
  "net/http"
)

type Controller interface {
  UploadPhoto(w http.ResponseWriter, req *http.Request)
}

type controller struct {
  service Service
}

func NewController(service Service) Controller {
  return &controller{
    service,
  }
}

func (c *controller) UploadPhoto(w http.ResponseWriter, req *http.Request) {
  file, fileHeader, err := req.FormFile("photo")

  if err != nil {
    response.ServerError(w, err)
    return
  }

  if !c.service.IsValidType(fileHeader) {
    response.BadRequest(w, "Invalid file type")
    return
  }

  if !c.service.IsValidSize(fileHeader) {
    response.BadRequest(w, "Invalid file size")
    return
  }

  if err != nil {
    response.ServerError(w, err)
    return
  }

  // client, err := storage.NewClient(ctx.Context(), os.Getenv("PHOTO_BUCKET_NAME"))
  //
  // if err != nil {
  // 	response.ServerError(w, err)
  // }

  aiClient, err := image.NewVisionClient()

  if err != nil {
    response.ServerError(w, err)
    return
  }

  res, err := aiClient.DetectProperties(req.Context(), file)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  // if err := client.Upload(ctx.Context(), fileHeader.Filename, file); err != nil {
  // 	response.ServerError(w, err)
  //  return
  // }

  response.Ok(w, res)
}
