package config_test

import (
  "encoding/json"
  "github.com/go-chi/chi/v5"
  "github.com/golang/mock/gomock"
  "github.com/robbailey3/website-api/config"
  "io"
  "net/http"
  "net/http/httptest"
  "os"
  "testing"
)

type TestServer struct {
  Router         *chi.Mux
  MockController *gomock.Controller
  Controller     config.Controller
}

func createNewTestServer(t *testing.T) *TestServer {
  mockController := gomock.NewController(t)
  controller := config.NewController()
  router := chi.NewRouter()

  router.Get("/", controller.GetFirebaseConfig)

  return &TestServer{
    Router:         router,
    MockController: mockController,
    Controller:     controller,
  }
}

func checkResponseCode(t *testing.T, expected, actual int) {
  if expected != actual {
    t.Errorf("Expected response code %d. Got %d\n", expected, actual)
  }
}

func checkValue(t *testing.T, expected, actual string) {
  if expected != actual {
    t.Errorf("Expected response code %s. Got %s\n", expected, actual)
  }
}

func executeRequest(req *http.Request, t *TestServer) *httptest.ResponseRecorder {
  rr := httptest.NewRecorder()
  t.Router.ServeHTTP(rr, req)

  return rr
}

func setupEnvironmentVars() {
  _ = os.Setenv("FIREBASE_API_KEY", "FIREBASE_API_KEY")
  _ = os.Setenv("FIREBASE_AUTH_DOMAIN", "FIREBASE_AUTH_DOMAIN")
  _ = os.Setenv("GOOGLE_CLOUD_PROJECT", "GOOGLE_CLOUD_PROJECT")
  _ = os.Setenv("FIREBASE_STORAGE_BUCKET", "FIREBASE_STORAGE_BUCKET")
  _ = os.Setenv("FIREBASE_MESSAGING_SENDER_ID", "FIREBASE_MESSAGING_SENDER_ID")
  _ = os.Setenv("FIREBASE_APP_ID", "FIREBASE_APP_ID")
  _ = os.Setenv("FIREBASE_MEASUREMENT_ID", "FIREBASE_MEASUREMENT_ID")
}

func TestController_GetFirebaseConfig(t *testing.T) {
  t.Run("should return values found in the environment variables", func(t *testing.T) {
    setupEnvironmentVars()

    sut := createNewTestServer(t)

    request := httptest.NewRequest(http.MethodGet, "/", nil)

    response := executeRequest(request, sut)

    checkResponseCode(t, 200, response.Result().StatusCode)

    var result = struct {
      Result config.FirebaseConfig `json:"result"`
    }{}

    bodyBytes, err := io.ReadAll(response.Body)

    if err != nil {
      t.Errorf("Failed to parse body")
    }

    err = json.Unmarshal(bodyBytes, &result)

    if err != nil {
      t.Errorf("Failed to parse body")
    }

    checkValue(t, result.Result.ApiKey, os.Getenv("FIREBASE_API_KEY"))
    checkValue(t, result.Result.AuthDomain, os.Getenv("FIREBASE_AUTH_DOMAIN"))
    checkValue(t, result.Result.ApiKey, os.Getenv("FIREBASE_API_KEY"))
    checkValue(t, result.Result.MessagingSenderId, os.Getenv("FIREBASE_MESSAGING_SENDER_ID"))
    checkValue(t, result.Result.MeasurementId, os.Getenv("FIREBASE_MEASUREMENT_ID"))
    checkValue(t, result.Result.StorageBucket, os.Getenv("FIREBASE_STORAGE_BUCKET"))
    checkValue(t, result.Result.ProjectId, os.Getenv("GOOGLE_CLOUD_PROJECT"))
  })
}
