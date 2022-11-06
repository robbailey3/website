package distillery

type Distillery struct {
	Name   string `json:"name" validate:"required"`
	Region string `json:"region" validate:"required,oneof='Islay Speyside Island Lowland'"`
}
