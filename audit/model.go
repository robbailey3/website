package audit

import (
  "go.mongodb.org/mongo-driver/bson/primitive"
  "time"
)

type AppResource string

const (
  BlogResource     AppResource = "blog"
  ActivityResource AppResource = "activity"
  ImageResource    AppResource = "image"
  PhotoResource    AppResource = "photo"
  TaskResource     AppResource = "task"
)

type ActionType string

const (
  ReadActionType   ActionType = "read"
  InsertActionType ActionType = "insert"
  UpdateActionType ActionType = "update"
  DeleteActionType ActionType = "delete"
)

type AuditLog struct {
  Id         primitive.ObjectID `bson:"_id" json:"id"`
  Resource   AppResource        `bson:"resource" json:"resource"`
  Timestamp  time.Time          `bson:"timestamp" json:"timestamp"`
  UserId     string             `bson:"userId" json:"userId"`
  ActionType ActionType         `bson:"actionType" json:"actionType"`
  RequestUri string             `bson:"requestUri" json:"requestUri"`
}
