package github_test

import (
  "github.com/golang/mock/gomock"
  "github.com/robbailey3/website-api/github"
  mock_hermod "github.com/robbailey3/website-api/mocks/hermod"
  mock_secrets "github.com/robbailey3/website-api/mocks/secrets"
  "testing"
)

type TestClient struct {
  MockController *gomock.Controller
  Secrets        *mock_secrets.MockClient
  Hermod         *mock_hermod.MockHermod
  Client         github.ApiClient
}

func createNewTestClient(t *testing.T) *TestClient {
  mockController := gomock.NewController(t)

  mockSecretsClient := mock_secrets.NewMockClient(mockController)

  mockSecretsClient.EXPECT().GetSecret(gomock.Any(), gomock.Any()).Times(1).Return("", nil)

  return &TestClient{
    MockController: mockController,
    Hermod:         mock_hermod.NewMockHermod(mockController),
    Secrets:        mockSecretsClient,
    Client:         github.NewApiClient(mockSecretsClient),
  }
}

func TestClientImpl_GetUser(t *testing.T) {
  t.Run("should send a request using Hermod", func(t *testing.T) {
    sut := createNewTestClient(t)

    _, err := sut.Client.GetUser(github.GetUserRequest{
      Username: "test-user",
    })

    if err != nil {
      t.Errorf("Received unexpected error: %s", err.Error())
    }
  })
}
