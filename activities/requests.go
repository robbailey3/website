package activities

type GetActivitiesRequest struct {
  Limit int `query:"limit" validate:"gte=1,lte=100"`
  Skip  int `query:"skip" validate:"gte=0"`
}
