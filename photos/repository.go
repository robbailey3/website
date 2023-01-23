package photos

type Repository interface {
}

type repository struct {
}

func NewRepository() Repository {
  return &repository{}
}
