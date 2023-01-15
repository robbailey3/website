package blog_test

import (
  "bytes"
  "encoding/json"
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

func checkResponseCode(t *testing.T, expected, actual int) {
  if expected != actual {
    t.Errorf("Expected response code %d. Got %d\n", expected, actual)
  }
}

func executeRequest(req *http.Request, t *TestServer) *httptest.ResponseRecorder {
  rr := httptest.NewRecorder()
  t.Router.ServeHTTP(rr, req)

  return rr
}

func TestController_GetPosts(t *testing.T) {
  t.Run("should return 400 bad request for invalid limit", func(t *testing.T) {
    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodGet, "/?limit=dodgylimit&offset=0", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 400, response.Result().StatusCode)
  })

  t.Run("should return 400 bad request for invalid offset", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=dodgyoffset", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 400, response.Result().StatusCode)
  })

  t.Run("should return a status code of 200", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return([]blog.Post{}, nil)

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=0", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusOK, response.Result().StatusCode)
  })

  t.Run("should return a 500 status code when the ServiceImpl returns an error", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPosts(gomock.Any(), gomock.Any(), gomock.Any()).AnyTimes().Return(nil, errors.New("something went wrong"))

    request := httptest.NewRequest(http.MethodGet, "/?limit=100&offset=0", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusInternalServerError, response.Result().StatusCode)
  })
}

func TestController_GetPost(t *testing.T) {
  t.Run("should return 404 when the ServiceImpl returns a not found exception", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Any()).AnyTimes().Return(nil, exception.NotFound())

    request := httptest.NewRequest(http.MethodGet, "/1234", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 404, response.Result().StatusCode)
  })

  t.Run("should return 500 when the ServiceImpl returns any other exception", func(t *testing.T) {
    sut := createNewTestServer(t)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Any()).AnyTimes().Return(nil, errors.New("kaboom"))

    request := httptest.NewRequest(http.MethodGet, "/1234", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 500, response.Result().StatusCode)
  })

  t.Run("should call the get post method of the ServiceImpl and pass in the Id", func(t *testing.T) {
    sut := createNewTestServer(t)

    testId := 1234

    request := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/%d", testId), nil)

    sut.Service.EXPECT().GetPost(gomock.Any(), gomock.Eq(fmt.Sprintf("%d", testId))).AnyTimes().Return(nil, errors.New("kaboom"))

    executeRequest(request, sut)
  })
}

func TestController_AddPost(t *testing.T) {
  t.Run("should return 400 when no body is passed in the request", func(t *testing.T) {
    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodPost, "/", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 400, response.Result().StatusCode)
  })

  t.Run("should return 400 when the request body fails validation", func(t *testing.T) {
    sut := createNewTestServer(t)

    requestBody := &blog.AddPostRequest{
      Title:   "",
      Content: "",
    }

    requestBytes, _ := json.Marshal(requestBody)

    request := httptest.NewRequest(http.MethodPost, "/", bytes.NewReader(requestBytes))

    response := executeRequest(request, sut)

    checkResponseCode(t, 400, response.Result().StatusCode)
  })

  t.Run("should call the AddPost method of the ServiceImpl", func(t *testing.T) {
    sut := createNewTestServer(t)

    requestBody := &blog.AddPostRequest{
      Title:   "Some test title",
      Content: "Some test content",
    }

    requestBytes, _ := json.Marshal(requestBody)

    request := httptest.NewRequest(http.MethodPost, "/", bytes.NewReader(requestBytes))

    sut.Service.EXPECT().AddPost(gomock.Any(), requestBody).Times(1).Return(nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusCreated, response.Result().StatusCode)
  })

  t.Run("should return InternalServerError when the ServiceImpl returns an error", func(t *testing.T) {
    sut := createNewTestServer(t)

    requestBody := &blog.AddPostRequest{
      Title:   "Some test title",
      Content: "Some test content",
    }

    requestBytes, _ := json.Marshal(requestBody)

    request := httptest.NewRequest(http.MethodPost, "/", bytes.NewReader(requestBytes))

    sut.Service.EXPECT().AddPost(gomock.Any(), requestBody).Times(1).Return(errors.New("something went wrong"))

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusInternalServerError, response.Result().StatusCode)
  })
}

func TestController_UpdatePost(t *testing.T) {
  t.Run("should call the UpdatePost method of the ServiceImpl", func(t *testing.T) {
    requestBody := &blog.UpdatePostRequest{
      Title:   "Title",
      Content: "Content",
    }

    requestBytes, _ := json.Marshal(requestBody)

    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/%s", testId), bytes.NewReader(requestBytes))

    sut.Service.EXPECT().UpdatePost(gomock.Any(), testId, requestBody).Times(1).Return(nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusAccepted, response.Result().StatusCode)
  })

  t.Run("should return BadRequest status when no body is passed", func(t *testing.T) {
    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/%s", testId), nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusBadRequest, response.Result().StatusCode)
  })

  t.Run("should return BadRequest status when an invalid body is passed", func(t *testing.T) {
    requestBody := &blog.UpdatePostRequest{
      Title:   "",
      Content: "",
    }

    requestBytes, _ := json.Marshal(requestBody)

    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/%s", testId), bytes.NewReader(requestBytes))

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusBadRequest, response.Result().StatusCode)
  })

  t.Run("should return BadRequest status when an invalid body is passed", func(t *testing.T) {
    requestBody := &blog.UpdatePostRequest{
      Title:   "Title",
      Content: "Content",
    }

    requestBytes, _ := json.Marshal(requestBody)

    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodPatch, fmt.Sprintf("/%s", testId), bytes.NewReader(requestBytes))

    sut.Service.EXPECT().UpdatePost(gomock.Any(), testId, requestBody).Times(1).Return(exception.NotFound())

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusNotFound, response.Result().StatusCode)
  })
}

func TestController_DeletePost(t *testing.T) {
  t.Run("should call the DeletePost method of the ServiceImpl with the provided Id", func(t *testing.T) {
    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/%s", testId), nil)

    sut.Service.EXPECT().DeletePost(gomock.Any(), testId).Times(1).Return(nil)

    executeRequest(request, sut)
  })

  t.Run("should return an accepted response when the ServiceImpl does not return an error", func(t *testing.T) {
    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/%s", testId), nil)

    sut.Service.EXPECT().DeletePost(gomock.Any(), testId).Times(1).Return(nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusAccepted, response.Result().StatusCode)
  })

  t.Run("should return a server error response when the ServiceImpl returns an error", func(t *testing.T) {
    testId := "test-123"

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/%s", testId), nil)

    sut.Service.EXPECT().DeletePost(gomock.Any(), testId).Times(1).Return(errors.New("something went wrong"))

    response := executeRequest(request, sut)

    checkResponseCode(t, http.StatusInternalServerError, response.Result().StatusCode)
  })
}
