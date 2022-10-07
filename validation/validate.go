package validation

import "github.com/go-playground/validator/v10"

type ValidationError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value"`
}

func Validate(val interface{}) []*ValidationError {
	validate := validator.New()

	err := validate.Struct(val)

	if err != nil {
		vErrs := err.(validator.ValidationErrors)

		var validationErrors []*ValidationError
		for _, vErr := range vErrs {
			var err ValidationError
			err.Field = vErr.StructNamespace()
			err.Tag = vErr.Tag()
			err.Value = vErr.Param()
			validationErrors = append(validationErrors, &err)
		}
		return validationErrors
	}
	return nil
}
