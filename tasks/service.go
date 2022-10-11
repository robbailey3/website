package tasks

import (
	"cloud.google.com/go/firestore"
	"context"
)

type Service interface {
	GetTasks(ctx context.Context) ([]*Task, error)
	CreateTask(ctx context.Context, task *Task) error
	UpdateTask(ctx context.Context, id string, request *UpdateTaskRequest) error
	DeleteTask(ctx context.Context, id string) error
}

type service struct {
	repository Repository
}

func NewService(db *firestore.Client) Service {
	return &service{repository: NewRepository(db)}
}

func (s *service) GetTasks(ctx context.Context) ([]*Task, error) {
	return s.repository.Get(ctx)
}

func (s *service) CreateTask(ctx context.Context, task *Task) error {
	return s.repository.Create(ctx, task)
}

func (s *service) UpdateTask(ctx context.Context, id string, request *UpdateTaskRequest) error {
	return s.repository.Update(ctx, id, request.Title, request.Completed)
}

func (s *service) DeleteTask(ctx context.Context, id string) error {
	return s.repository.Delete(ctx, id)
}
