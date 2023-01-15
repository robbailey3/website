package blog_test

import (
  "github.com/golang/mock/gomock"
  "github.com/robbailey3/website-api/blog"
  mock_blog "github.com/robbailey3/website-api/mocks/blog"
  "testing"
)

type SUT struct {
  Repository     *mock_blog.MockRepository
  TestController *gomock.Controller
  Service        blog.Service
}

func setupTests(t *testing.T) *SUT {
  testController := gomock.NewController(t)
  mockRepository := mock_blog.NewMockRepository(testController)
  return &SUT{
    TestController: testController,
    Repository:     mockRepository,
    Service:        blog.NewService(mockRepository),
  }
}

func TestService_GetPost(t *testing.T) {

}
