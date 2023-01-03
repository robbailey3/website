package secrets

type GetSecretsOpts struct {
  version int
}

func GetSecretsOptions() *GetSecretsOpts {
  return &GetSecretsOpts{version: 0}
}

func (g *GetSecretsOpts) WithVersion(version int) {
  g.version = version
}
