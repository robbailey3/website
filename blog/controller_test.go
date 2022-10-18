package blog

import (
	"context"
	"testing"

	"github.com/gofiber/fiber/v2"
)

type serviceMock struct {
	getPostCalls int
}

func (s *serviceMock) GetPosts(ctx *fiber.Ctx) ([]Post, error) {
	s.getPostCalls += 1

	return []Post{}, nil
}

func (s *serviceMock) GetPost(ctx *fiber.Ctx) (*Post, error) {
	panic("not implemented") // TODO: Implement
}

func (s *serviceMock) InsertPost(ctx *fiber.Ctx) error {
	panic("not implemented") // TODO: Implement
}

func (s *serviceMock) UpdatePost(ctx context.Context, id string, request UpdatePostRequest) error {
	panic("not implemented") // TODO: Implement
}

func (s *serviceMock) DeletePost(ctx context.Context, id string) error {
	panic("not implemented") // TODO: Implement
}

func Test_controller_GetPosts(t *testing.T) {
	mockService := &serviceMock{
		getPostCalls: 0,
	}

	controller := NewController(mockService)

	controller.GetPosts(&fiber.Ctx{})

	if mockService.getPostCalls != 1 {
		t.Errorf("got %d want 1", mockService.getPostCalls)
	}
}

func Test_controller_GetPost(t *testing.T) {
	type args struct {
		ctx *fiber.Ctx
	}
	tests := []struct {
		name    string
		c       *controller
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.c.GetPost(tt.args.ctx); (err != nil) != tt.wantErr {
				t.Errorf("controller.GetPost() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
