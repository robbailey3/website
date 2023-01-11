package blog

import "context"

// TODO

type testMethodLogger struct {
	CallCount int
}

type serviceMock struct {
	methodLogger map[string]testMethodLogger
}

func (s *serviceMock) GetPosts(ctx context.Context) ([]Post, error) {
	return []Post{}, nil
}

func (s *serviceMock) GetPost(ctx context.Context, id string) (*Post, error) {
	return &Post{}, nil
}

func (s *serviceMock) InsertPost(ctx context.Context, req *InsertPostRequest) error {
	return nil
}

func (s *serviceMock) UpdatePost(ctx context.Context, id string, request UpdatePostRequest) error {
	return nil
}

func (s *serviceMock) DeletePost(ctx context.Context, id string) error {
	return nil
}
