package blog_test

import (
  "fmt"
  "github.com/go-chi/chi/v5"
  "github.com/golang/mock/gomock"
  "github.com/pkg/errors"
  "github.com/robbailey3/website-api/blog"
  "github.com/robbailey3/website-api/exception"
  mock_blog "github.com/robbailey3/website-api/mocks/blog"
  "net/http"
  "net/http/httptest"
  "testing"
)

type TestServer struct {
  Router         *chi.Mux
  MockController *gomock.Controller
  Service        *mock_blog.MockService
  Controller     blog.Controller
}

func createNewTestServer(t *testing.T) *TestServer {
  mockController := gomock.NewController(t)
  service := mock_blog.NewMockService(mockController)
  controller := blog.NewController(service)
  router := chi.NewRouter()

  router.Get("/", controller.GetPosts)
  router.Get("/{id}", controller.GetPost)
  router.Patch("/{id}", controller.UpdatePost)
  router.Post("/", controller.AddPost)
  router.Delete("/{id}", controller.DeletePost)

  return &TestServer{
    Router:         router,
    MockController: mockController,
    Service:        service,
    Controller:     controller,
  }
}

// checkResponseCode is a simple utility to check the response code
// of the response
func checkResponseCode(t *testing.T, expected, actual int) {
  if expected != actual {
    t.Errorf("Expected response code %d. Got %d\n", expected, actual)
  }
}

// executeRequest, creates a new ResponseRecorder
// then executes the request by calling ServeHTTP in the router
// after which the handler writes the response to the response recorder
// which we can then inspect.
func executeRequest(req *http.Request, t *TestServer) *httptest.ResponseRecorder {
  rr := httptest.NewRecorder()
  t.Router.ServeHTTP(rr, req)

  return rr
}

func TestController_GetPosts(t *testing.T) {
  t.Run("should return 400 bad request for invalid limit", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any())

    request := httptest.NewRequest(http.MethodGet, "/?limit=dodgylimit&offset=0", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusBadRequest {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return 400 bad request for invalid offset", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=dodgyoffset", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusBadRequest {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return a status code of 200", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=0", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusOK {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return a 500 status code when the service returns an error", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return(nil, errors.New("something went wrong"))

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=0", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusInternalServerError {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })
}

func TestController_GetPost(t *testing.T) {
  t.Run("should return 404 when the service returns a not found exception", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Any()).AnyTimes().Return(nil, exception.NotFound())

    request := httptest.NewRequest(http.MethodGet, "/1234", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusNotFound {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should return 500 when the service returns any other exception", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Any()).AnyTimes().Return(nil, errors.New("kaboom"))

    request := httptest.NewRequest(http.MethodGet, "/1234", nil)

    response := executeRequest(request, sut)

    if response.Result().StatusCode != http.StatusInternalServerError {
      t.Errorf("incorrect status code returned, got %d", response.Result().StatusCode)
    }
  })

  t.Run("should call the get post method of the service and pass in the Id", func(t *testing.T) {
    sut := createNewTestServer(t)

    testId := 1234

    request := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/%d", testId), nil)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Eq(fmt.Sprintf("%d", testId))).AnyTimes().Return(nil, errors.New("kaboom"))

    executeRequest(request, sut)
  })
}
