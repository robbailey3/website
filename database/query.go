package database

import (
	"cloud.google.com/go/firestore"
	"context"
)

type QueryBuilder interface {
	WithLimit(limit int) QueryBuilder
	WithOffset(offset int) QueryBuilder
	WithOrderBy(path string, dir firestore.Direction) QueryBuilder
	Where(path, operator string, value interface{}) QueryBuilder
}

type queryBuilder struct {
	collection *firestore.CollectionRef
	query      firestore.Query
}

func newQueryBuilder(collectionName string, f *firestore.Client) *queryBuilder {
	coll := f.Collection(collectionName)
	query := coll.Query
	return &queryBuilder{collection: coll, query: query}
}

func (q *queryBuilder) WithLimit(limit int) QueryBuilder {
	q.query = q.query.Limit(limit)
	return q
}

func (q *queryBuilder) WithOffset(offset int) QueryBuilder {
	q.query = q.query.Offset(offset)
	return q
}

func (q *queryBuilder) WithOrderBy(path string, dir firestore.Direction) QueryBuilder {
	q.query = q.query.OrderBy(path, dir)
	return q
}

func (q *queryBuilder) Where(path, operator string, value interface{}) QueryBuilder {
	q.query = q.query.Where(path, operator, value)
	return q
}

func (q *queryBuilder) Apply(ctx context.Context) *firestore.DocumentIterator {
	return q.query.Documents(ctx)
}
