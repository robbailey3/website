package response

import (
	"bytes"
	"github.com/gofiber/fiber/v2"
	"io"
	"log"
	"net/http"
	"strings"
)

func File(ctx *fiber.Ctx, file io.Reader) error {
	var buf bytes.Buffer

	cp := io.TeeReader(file, &buf)

	fileBytes, err := io.ReadAll(cp)

	if err != nil {
		log.Fatal(err)
	}

	contentType := http.DetectContentType(fileBytes)

	return ctx.Type(strings.Split(contentType, "/")[1]).SendStream(&buf)
}
