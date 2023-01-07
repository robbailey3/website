package middleware

import (
  "github.com/gofiber/fiber/v2"
  "github.com/robbailey3/website-api/response"
  "github.com/robbailey3/website-api/validation"
)

type ErrorResponse struct {
  FailedField string
  Tag         string
  Value       string
}

func UseBodyValidation[T any](ctx *fiber.Ctx) error {
  var result T

  err := ctx.BodyParser(&result)

  if err != nil {
    return err
  }

  errs := validation.Validate(&result)

  if errs != nil {
    return response.ValidationError(ctx, errs)
  }

  return ctx.Next()
}

func UseQueryValidation[T any](ctx *fiber.Ctx) error {
  var result T

  err := ctx.QueryParser(&result)

  if err != nil {
    return err
  }

  errs := validation.Validate(&result)

  if errs != nil {
    return response.ValidationError(ctx, errs)
  }

  return ctx.Next()
}
