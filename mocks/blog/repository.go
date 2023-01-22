// Code generated by MockGen. DO NOT EDIT.
// Source: blog/repository.go

// Package mock_blog is a generated GoMock package.
package mock_blog

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	blog "github.com/robbailey3/website-api/blog"
)

// MockRepository is a mock of Repository interface.
type MockRepository struct {
	ctrl     *gomock.Controller
	recorder *MockRepositoryMockRecorder
}

// MockRepositoryMockRecorder is the mock recorder for MockRepository.
type MockRepositoryMockRecorder struct {
	mock *MockRepository
}

// NewMockRepository creates a new mock instance.
func NewMockRepository(ctrl *gomock.Controller) *MockRepository {
	mock := &MockRepository{ctrl: ctrl}
	mock.recorder = &MockRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockRepository) EXPECT() *MockRepositoryMockRecorder {
	return m.recorder
}

// Delete mocks base method.
func (m *MockRepository) Delete(ctc context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", ctc, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// Delete indicates an expected call of Delete.
func (mr *MockRepositoryMockRecorder) Delete(ctc, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockRepository)(nil).Delete), ctc, id)
}

// GetMany mocks base method.
func (m *MockRepository) GetMany(ctx context.Context, limit, offset int) ([]blog.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetMany", ctx, limit, offset)
	ret0, _ := ret[0].([]blog.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetMany indicates an expected call of GetMany.
func (mr *MockRepositoryMockRecorder) GetMany(ctx, limit, offset interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetMany", reflect.TypeOf((*MockRepository)(nil).GetMany), ctx, limit, offset)
}

// GetOne mocks base method.
func (m *MockRepository) GetOne(ctx context.Context, id int64) (*blog.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetOne", ctx, id)
	ret0, _ := ret[0].(*blog.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetOne indicates an expected call of GetOne.
func (mr *MockRepositoryMockRecorder) GetOne(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetOne", reflect.TypeOf((*MockRepository)(nil).GetOne), ctx, id)
}

// Insert mocks base method.
func (m *MockRepository) Insert(ctx context.Context, post *blog.PostDto) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Insert", ctx, post)
	ret0, _ := ret[0].(error)
	return ret0
}

// Insert indicates an expected call of Insert.
func (mr *MockRepositoryMockRecorder) Insert(ctx, post interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Insert", reflect.TypeOf((*MockRepository)(nil).Insert), ctx, post)
}

// UpdateOne mocks base method.
func (m *MockRepository) UpdateOne(ctx context.Context, id int64, update *blog.UpdatePostRequest) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateOne", ctx, id, update)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateOne indicates an expected call of UpdateOne.
func (mr *MockRepositoryMockRecorder) UpdateOne(ctx, id, update interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateOne", reflect.TypeOf((*MockRepository)(nil).UpdateOne), ctx, id, update)
}
