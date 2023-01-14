package blog_test

import (
  "github.com/golang/mock/gomock"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/blog"
  "github.com/robbailey3/website-api/exception"
  mock_blog "github.com/robbailey3/website-api/mocks/blog"
  "net/http"
  "net/http/httptest"
  "testing"
)

func newTestController(service blog.Service) blog.Controller {
  return blog.NewController(service)
}

func TestController_GetPosts(t *testing.T) {
  t.Run("should return 400 bad request for invalid limit", func(t *testing.T) {
    mockController := gomock.NewController(t)
    s := mock_blog.NewMockService(mockController)

    s.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    c := newTestController(s)

    request := httptest.NewRequest(http.MethodGet, "/blog?limit=dodgylimit&offset=0", nil)
    response := httptest.NewRecorder()

    c.GetPosts(response, request)

    if response.Result().StatusCode != http.StatusBadRequest {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return 400 bad request for invalid offset", func(t *testing.T) {
    mockController := gomock.NewController(t)
    s := mock_blog.NewMockService(mockController)

    s.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    c := newTestController(s)

    request := httptest.NewRequest(http.MethodGet, "/blog?limit=100&offset=dodgyoffset", nil)
    response := httptest.NewRecorder()

    c.GetPosts(response, request)

    if response.Result().StatusCode != http.StatusBadRequest {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return a status code of 200", func(t *testing.T) {
    mockController := gomock.NewController(t)
    s := mock_blog.NewMockService(mockController)

    s.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    c := newTestController(s)

    request := httptest.NewRequest(http.MethodGet, "/blog?limit=100&offset=0", nil)
    response := httptest.NewRecorder()

    c.GetPosts(response, request)

    if response.Result().StatusCode != http.StatusOK {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return a 500 status code when the service returns an error", func(t *testing.T) {
    mockController := gomock.NewController(t)
    s := mock_blog.NewMockService(mockController)

    s.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return(nil, errors.New("something went wrong"))

    c := newTestController(s)

    request := httptest.NewRequest(http.MethodGet, "/blog?limit=100&offset=0", nil)
    response := httptest.NewRecorder()

    c.GetPosts(response, request)

    if response.Result().StatusCode != http.StatusInternalServerError {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })
}

func TestController_GetPost(t *testing.T) {
  t.Run("should return 404 when the service returns a not found exception", func(t *testing.T) {
    mockController := gomock.NewController(t)
    s := mock_blog.NewMockService(mockController)

    s.EXPECT().GetPost(gomock.Any(), gomock.Any()).AnyTimes().Return(nil, exception.NotFound())

    c := newTestController(s)

    request := httptest.NewRequest(http.MethodGet, "/1234", nil)
    response := httptest.NewRecorder()

    c.GetPost(response, request)

    if response.Result().StatusCode != http.StatusNotFound {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })
}
