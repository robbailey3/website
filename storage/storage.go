package storage

import (
	"cloud.google.com/go/storage"
	"context"
	"io"
	"mime/multipart"
)

type Client interface {
	Upload(ctx context.Context, name string, file multipart.File) error
}

type client struct {
	bucket *storage.BucketHandle
}

func NewClient(ctx context.Context, bucketName string) (Client, error) {
	storageClient, err := storage.NewClient(ctx)

	if err != nil {
		return nil, err
	}

	bucket := storageClient.Bucket(bucketName)

	c := &client{
		bucket,
	}

	return c, nil
}

func (c *client) Upload(ctx context.Context, name string, file multipart.File) error {
	wc := c.bucket.Object(name).NewWriter(ctx)

	_, err := io.Copy(wc, file)

	if err != nil {
		return err
	}

	if err := wc.Close(); err != nil {
		return err
	}

	return nil
}
