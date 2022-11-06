package database

import (
	"cloud.google.com/go/firestore"
)

type QueryParam struct {
	path     string
	operator string
	value    interface{}
}

type QueryBuilder interface {
	WithLimit(limit int) QueryBuilder
	WithSkip(skip int) QueryBuilder
	Where(path, operator string, value interface{})
}

type queryBuilder struct {
	q firestore.Query
}

func (q queryBuilder) WithLimit(limit int) QueryBuilder {
	q.q = q.q.Limit(limit)
	return q
}

func (q queryBuilder) WithSkip(skip int) QueryBuilder {
	// TODO implement me
	panic("implement me")
}

func (q queryBuilder) Where(path, operator string, value interface{}) {
	// TODO implement me
	panic("implement me")
}
