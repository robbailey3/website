package blog

type InsertPostRequest struct {
}

type UpdatePostRequest struct {
  Title   string `json:"title" validate:"required"`
  Content string `json:"content" validate:"required"`
}
