package secrets

import (
  secretmanager "cloud.google.com/go/secretmanager/apiv1"
  "cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
  "context"
  "fmt"
  "os"
  "sync"
)

type Client interface {
  GetSecret(ctx context.Context, secretName string, opts ...*GetSecretsOpts) (string, error)
}

type clientImpl struct {
  client    *secretmanager.Client
  projectId string
}

var initOnce sync.Once

var client *clientImpl

var initErr error

func NewClient() (Client, error) {
  initOnce.Do(func() {
    ctx := context.Background()
    c, err := secretmanager.NewClient(ctx)
    if err != nil {
      initErr = err
    }

    client = &clientImpl{
      client:    c,
      projectId: os.Getenv("GOOGLE_CLOUD_PROJECT"),
    }
  })
  return client, initErr
}

func (c *clientImpl) GetSecret(ctx context.Context, secretName string, opts ...*GetSecretsOpts) (string, error) {
  versionStr := ""
  version := 0
  for _, opt := range opts {
    version = opt.version
  }
  if version == 0 {
    versionStr = "latest"
  } else {
    versionStr = fmt.Sprintf("%d", version)
  }
  result, err := c.client.AccessSecretVersion(ctx, &secretmanagerpb.AccessSecretVersionRequest{
    Name: fmt.Sprintf("projects/%s/secrets/%s/versions/%s", c.projectId, secretName, versionStr),
  })
  if err != nil {
    return "", err
  }
  return string(result.Payload.Data), nil
}
