package openai

type Service interface {
	GetCompletion(request *GetCompletionRequest) (*Completion, error)
	GetEdit(request GetEditRequest) (*Edit, error)
}

type serviceImpl struct {
	client Client
}

func NewService() Service {
	return &serviceImpl{client: NewClient()}
}

func (s serviceImpl) GetCompletion(request *GetCompletionRequest) (*Completion, error) {
	return s.client.GetCompletion(request)
}

func (s serviceImpl) GetEdit(request GetEditRequest) (*Edit, error) {
	return s.client.GetEdit(request)
}
