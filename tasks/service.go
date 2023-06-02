package tasks

import (
  "context"
  "go.mongodb.org/mongo-driver/bson/primitive"
)

type Service interface {
  GetTasks(ctx context.Context) ([]Task, error)
  CreateTask(ctx context.Context, task *TaskDto) error
  UpdateTask(ctx context.Context, id primitive.ObjectID, request *UpdateTaskRequest) error
  DeleteTask(ctx context.Context, id primitive.ObjectID) error
}

type service struct {
  repository Repository
}

func NewService() Service {
  return &service{repository: NewRepository()}
}

func (s *service) GetTasks(ctx context.Context) ([]Task, error) {
  return s.repository.FindAll(ctx)
}

func (s *service) CreateTask(ctx context.Context, task *TaskDto) error {
  return s.repository.Insert(ctx, task)
}

func (s *service) UpdateTask(ctx context.Context, id primitive.ObjectID, request *UpdateTaskRequest) error {
  return s.repository.UpdateById(ctx, id, request.Title, request.Completed)
}

func (s *service) DeleteTask(ctx context.Context, id primitive.ObjectID) error {
  return s.repository.Delete(ctx, id)
}
