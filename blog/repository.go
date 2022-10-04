package blog

type Repository interface {
	GetMany() []Blog
	GetOne() Blog
	UpdateOne()
	Insert()
	Delete()
}

type repository struct {
}

func (r repository) GetMany() []Blog {
	// TODO implement me
	panic("implement me")
}

func (r repository) GetOne() Blog {
	// TODO implement me
	panic("implement me")
}

func (r repository) UpdateOne() {
	// TODO implement me
	panic("implement me")
}

func (r repository) Insert() {
	// TODO implement me
	panic("implement me")
}

func (r repository) Delete() {
	// TODO implement me
	panic("implement me")
}
