package secrets

import (
  "context"
  "fmt"
  "os"
  "sync"

  secretmanager "cloud.google.com/go/secretmanager/apiv1"
  "cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
)

var (
  client    *secretmanager.Client
  projectId string
  initOnce  sync.Once
  initErr   error
)

func Init() error {
  initOnce.Do(func() {
    ctx := context.Background()
    c, err := secretmanager.NewClient(ctx)
    if err != nil {
      initErr = err
    }

    projectId = os.Getenv("GOOGLE_PROJECT_ID")

    client = c
  })
  return initErr
}

func GetSecret(ctx context.Context, secretName string, opts ...*GetSecretsOpts) (string, error) {
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
  result, err := client.AccessSecretVersion(ctx, &secretmanagerpb.AccessSecretVersionRequest{
    Name: fmt.Sprintf("projects/%s/secrets/%s/versions/%s", projectId, secretName, versionStr),
  })
  if err != nil {
    return "", err
  }
  return string(result.Payload.Data), nil
}

func GetSecretOrDefault(ctx context.Context, secretName string, opts *GetSecretsOpts, defaultStr string) string {
  result, err := GetSecret(ctx, secretName, opts)

  if err != nil {
    return defaultStr
  }

  return result
}

func UpdateSecret(ctx context.Context, secretName string, newSecret string) error {
  _, err := client.AddSecretVersion(ctx, &secretmanagerpb.AddSecretVersionRequest{
    Parent: fmt.Sprintf("projects/%s/secrets/%s", projectId, secretName),
    Payload: &secretmanagerpb.SecretPayload{
      Data: []byte(newSecret),
    },
  })

  return err
}
