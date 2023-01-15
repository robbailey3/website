package blog

type AddPostRequest struct {
  Title   string `json:"title" validate:"required,min=3,max=64"`
  Content string `json:"content" validate:"required,min=1"`
}

type UpdatePostRequest struct {
  Title   string `json:"title" validate:"required"`
  Content string `json:"content" validate:"required"`
}
