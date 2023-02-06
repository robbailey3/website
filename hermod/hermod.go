package hermod

import (
  "bytes"
  "encoding/json"
  "errors"
  "github.com/gookit/slog"
  "io"
  "net/http"
)

type Hermod interface {
  WithHeader(key, value string) Hermod
  WithBody(body []byte) Hermod
  WithQueryParam(key, value string) Hermod
  Send(result interface{}) error
}

type hermodImpl struct {
  method  string
  url     string
  headers map[string]string
  params  map[string]string
  body    []byte
}

func New(method string, url string) Hermod {
  return &hermodImpl{
    method:  method,
    url:     url,
    headers: make(map[string]string),
    params:  make(map[string]string),
    body:    nil,
  }
}

func (h *hermodImpl) WithHeader(key, value string) Hermod {
  h.headers[key] = value
  return h
}

func (h *hermodImpl) WithQueryParam(key string, value string) Hermod {
  h.params[key] = value
  return h
}

func (h *hermodImpl) WithBody(body []byte) Hermod {
  h.body = body
  return h
}

func (h *hermodImpl) Send(result interface{}) error {
  client := http.Client{}

  request, err := http.NewRequest(h.method, h.url, bytes.NewReader(h.body))

  if err != nil {
    return err
  }

  query := request.URL.Query()

  for key, value := range h.headers {
    request.Header.Set(key, value)
  }

  for key, value := range h.params {
    query.Set(key, value)
  }
  request.URL.RawQuery = query.Encode()

  response, err := client.Do(request)

  if err != nil {
    return err
  }

  if response.StatusCode < 200 || response.StatusCode >= 300 {
    respBytes, err := io.ReadAll(response.Body)
    if err != nil {
      return err
    }
    slog.Info(string(respBytes))
    return errors.New("response code did not indicate success")
  }

  responseBytes, err := io.ReadAll(response.Body)

  if err != nil {
    return err
  }

  return json.Unmarshal(responseBytes, result)
}
