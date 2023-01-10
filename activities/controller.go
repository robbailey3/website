package activities

import (
  "cloud.google.com/go/firestore"
  "encoding/json"
  "github.com/go-chi/chi/v5"
  "github.com/gookit/slog"
  "github.com/robbailey3/website-api/response"
  "io"
  "log"
  "net/http"
)

type Controller interface {
  HandleGet(w http.ResponseWriter, req *http.Request)
  HandleGetById(w http.ResponseWriter, req *http.Request)
  HandleWebhookGet(w http.ResponseWriter, req *http.Request)
  HandleWebhookPost(w http.ResponseWriter, req *http.Request)
}

type controller struct {
  service Service
}

func NewController(db *firestore.Client) Controller {
  service, err := NewService(db)
  if err != nil {
    // TODO: Handle this error better
    log.Println(err)
  }
  return &controller{service}
}

func (c *controller) HandleGet(w http.ResponseWriter, req *http.Request) {
  var request GetActivitiesRequest

  activities, err := c.service.GetActivities(req.Context(), &request)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, activities)
}

func (c *controller) HandleGetById(w http.ResponseWriter, req *http.Request) {
  id := chi.URLParam(req, "id")

  activity, err := c.service.GetActivityById(req.Context(), id)

  if err != nil {
    response.ServerError(w, err)
    return
  }

  response.Ok(w, activity)
}

func (c *controller) HandleWebhookGet(w http.ResponseWriter, req *http.Request) {
  query := req.URL.Query()
  webhookQuery := WebhookChallengeRequest{
    HubChallenge: query.Get("hub.challenge"),
    HubMode:      query.Get("hub.mode"),
    HubVerify:    query.Get("hub.verify_token"),
  }
  if !c.service.VerifyWebhook(webhookQuery) {
    w.WriteHeader(http.StatusBadRequest)
    return
  }

  respBytes, err := json.Marshal(&VerifyWebhookResponse{
    HubChallenge: webhookQuery.HubChallenge,
  })

  if err != nil {
    return
  }

  w.Write(respBytes)
}

func (c *controller) HandleWebhookPost(w http.ResponseWriter, req *http.Request) {
  var request WebhookPostRequest

  bodyBytes, err := io.ReadAll(req.Body)

  if err != nil {
    w.WriteHeader(http.StatusBadRequest)
    return
  }

  if err := json.Unmarshal(bodyBytes, &request); err != nil {
    w.WriteHeader(http.StatusBadRequest)
    return
  }

  if request.ObjectType != "activity" {
    slog.Warn("Strava webhook request received for non-activity")
    w.WriteHeader(http.StatusBadRequest)
    return
  }

  if err := c.service.GetNewActivity(req.Context(), request.ObjectId); err != nil {
    slog.Error(err)
    w.WriteHeader(http.StatusInternalServerError)
    return
  }

  w.WriteHeader(http.StatusOK)
}
