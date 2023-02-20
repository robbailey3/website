// Code generated by MockGen. DO NOT EDIT.
// Source: hermod/hermod.go

// Package mock_hermod is a generated GoMock package.
package mock_hermod

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	hermod "github.com/robbailey3/website-api/hermod"
)

// MockHermod is a mock of Hermod interface.
type MockHermod struct {
	ctrl     *gomock.Controller
	recorder *MockHermodMockRecorder
}

// MockHermodMockRecorder is the mock recorder for MockHermod.
type MockHermodMockRecorder struct {
	mock *MockHermod
}

// NewMockHermod creates a new mock instance.
func NewMockHermod(ctrl *gomock.Controller) *MockHermod {
	mock := &MockHermod{ctrl: ctrl}
	mock.recorder = &MockHermodMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockHermod) EXPECT() *MockHermodMockRecorder {
	return m.recorder
}

// Send mocks base method.
func (m *MockHermod) Send(result interface{}) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Send", result)
	ret0, _ := ret[0].(error)
	return ret0
}

// Send indicates an expected call of Send.
func (mr *MockHermodMockRecorder) Send(result interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Send", reflect.TypeOf((*MockHermod)(nil).Send), result)
}

// WithBody mocks base method.
func (m *MockHermod) WithBody(body []byte) hermod.Hermod {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithBody", body)
	ret0, _ := ret[0].(hermod.Hermod)
	return ret0
}

// WithBody indicates an expected call of WithBody.
func (mr *MockHermodMockRecorder) WithBody(body interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithBody", reflect.TypeOf((*MockHermod)(nil).WithBody), body)
}

// WithHeader mocks base method.
func (m *MockHermod) WithHeader(key, value string) hermod.Hermod {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithHeader", key, value)
	ret0, _ := ret[0].(hermod.Hermod)
	return ret0
}

// WithHeader indicates an expected call of WithHeader.
func (mr *MockHermodMockRecorder) WithHeader(key, value interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithHeader", reflect.TypeOf((*MockHermod)(nil).WithHeader), key, value)
}

// WithQueryParam mocks base method.
func (m *MockHermod) WithQueryParam(key, value string) hermod.Hermod {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithQueryParam", key, value)
	ret0, _ := ret[0].(hermod.Hermod)
	return ret0
}

// WithQueryParam indicates an expected call of WithQueryParam.
func (mr *MockHermodMockRecorder) WithQueryParam(key, value interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithQueryParam", reflect.TypeOf((*MockHermod)(nil).WithQueryParam), key, value)
}