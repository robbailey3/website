package response

import (
  "bytes"
  "io"
  "log"
  "net/http"
  "strings"
)

func File(w http.ResponseWriter, file io.Reader) {
  var buf bytes.Buffer

  cp := io.TeeReader(file, &buf)

  fileBytes, err := io.ReadAll(cp)

  if err != nil {
    log.Fatal(err)
  }

  contentType := http.DetectContentType(fileBytes)

  w.Header().Add("Content-Type", strings.Split(contentType, "/")[1])
  w.Write(buf.Bytes())
}
