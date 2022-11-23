package photos

type GetPhotosRequest struct {
	Limit  int `query:"limit"`
	Offset int `query:"offset"`
}
