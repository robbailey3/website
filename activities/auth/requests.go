package auth

type GetAuthTokenRequestParams struct {
  ClientId     string `json:"client_id"`
  ClientSecret string `json:"client_secret"`
  GrantType    string `json:"grant_type"`
  RefreshToken string `json:"refresh_token"`
  Scopes       string `json:"scopes"`
}

type GetAuthTokenRequest struct {
  Params GetAuthTokenRequestParams `json:"params"`
}
