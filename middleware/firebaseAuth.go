package middleware

import (
  "errors"
  "github.com/gookit/slog"
  "net/http"
  "strings"

  firebase "firebase.google.com/go"
  "github.com/robbailey3/website-api/response"
)

func WithFirebaseAuth(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
    app, err := firebase.NewApp(req.Context(), nil)

    if err != nil {
      slog.Errorf("error instantiating firebase app: %v\n", err)
      response.ServerError(w, err)
      return
    }

    client, err := app.Auth(req.Context())

    if err != nil {
      slog.Errorf("error getting Auth client: %v\n", err)
      response.ServerError(w, err)
      return
    }

    authHeader := req.Header.Get("Authorization")

    if authHeader == "" {
      response.Unauthorized(w, errors.New("no auth header"))
    }

    idToken := strings.Split(authHeader, " ")[1]

    _, err = client.VerifyIDToken(req.Context(), idToken)

    if err != nil {
      slog.Errorf("error verifying ID token: %v\n", err)
      response.Unauthorized(w, errors.New("unable to verify token"))
      return
    }

    next.ServeHTTP(w, req)
  })
}
