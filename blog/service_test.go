package blog_test

import (
  "context"
  "github.com/golang/mock/gomock"
  "github.com/robbailey3/website-api/blog"
  mock_blog "github.com/robbailey3/website-api/mocks/blog"
  "github.com/stretchr/testify/assert"
  "go.mongodb.org/mongo-driver/bson/primitive"
  "testing"
  "time"
)

type SUT struct {
  Repository     *mock_blog.MockRepository
  TestController *gomock.Controller
  Service        blog.Service
}

func setupTests(t *testing.T) *SUT {
  testController := gomock.NewController(t)
  mockRepository := mock_blog.NewMockRepository(testController)
  return &SUT{
    TestController: testController,
    Repository:     mockRepository,
    Service: &blog.ServiceImpl{
      Repo: mockRepository,
      Clock: func() time.Time {
        return time.Date(2023, 1, 15, 12, 0, 0, 0, time.UTC)
      },
    },
  }
}

func TestServiceImpl_GetPosts(t *testing.T) {
  t.Run("should call the getMany method of the repository", func(t *testing.T) {
    sut := setupTests(t)

    limit := 50
    offset := 5

    sut.Repository.EXPECT().FindMany(gomock.Any(), limit, offset).Times(1).Return([]blog.Post{}, nil)

    _, _ = sut.Service.GetPosts(context.Background(), limit, offset)
  })

  t.Run("should return the posts from the repository", func(t *testing.T) {
    sut := setupTests(t)

    limit := 50
    offset := 5

    posts := []blog.Post{{
      Id:           primitive.NewObjectID(),
      Title:        "title",
      Content:      "content",
      DateAdded:    time.Now(),
      DateModified: time.Now(),
    }}

    sut.Repository.EXPECT().FindMany(gomock.Any(), limit, offset).Times(1).Return(posts, nil)

    response, err := sut.Service.GetPosts(context.Background(), limit, offset)

    assert.Nil(t, err)

    assert.Equal(t, 1, len(posts))

    assert.Equal(t, posts[0], response[0])
  })
}

func TestServiceImpl_GetPost(t *testing.T) {
  t.Run("should call the GetOne method of the repository", func(t *testing.T) {
    sut := setupTests(t)

    id := primitive.NewObjectID()

    sut.Repository.EXPECT().FindOneById(gomock.Any(), id).Times(1).Return(&blog.Post{}, nil)

    _, _ = sut.Service.GetPost(context.Background(), id.Hex())
  })

  t.Run("should return the post from the repository", func(t *testing.T) {
    sut := setupTests(t)

    id := primitive.NewObjectID()

    post := &blog.Post{
      Id:           id,
      Title:        "title",
      Content:      "content",
      DateAdded:    time.Now(),
      DateModified: time.Now(),
    }

    sut.Repository.EXPECT().FindOneById(gomock.Any(), id).Times(1).Return(post, nil)

    response, err := sut.Service.GetPost(context.Background(), id.Hex())

    assert.Nil(t, err)

    assert.Equal(t, post, response)
  })
}

func TestServiceImpl_AddPost(t *testing.T) {
  t.Run("should call the Insert method of the repository with the post", func(t *testing.T) {
    sut := setupTests(t)

    postRequest := &blog.AddPostRequest{
      Title:   "TestTitle",
      Content: "TestContent",
    }

    sut.Repository.EXPECT().Insert(gomock.Any(), &blog.PostDto{
      Title:        postRequest.Title,
      Content:      postRequest.Content,
      DateModified: time.Date(2023, 1, 15, 12, 0, 0, 0, time.UTC),
      DateAdded:    time.Date(2023, 1, 15, 12, 0, 0, 0, time.UTC),
    }).Times(1).Return(nil)

    _ = sut.Service.AddPost(context.Background(), postRequest)
  })
}

func TestServiceImpl_DeletePost(t *testing.T) {
  t.Run("should call the Delete method of the repository", func(t *testing.T) {
    sut := setupTests(t)

    testId := primitive.NewObjectID()

    sut.Repository.EXPECT().Delete(gomock.Any(), testId).Times(1).Return(nil)

    _ = sut.Service.DeletePost(context.Background(), testId.Hex())
  })
}

func TestServiceImpl_UpdatePost(t *testing.T) {
  t.Run("should call the Update method of the repository with the post", func(t *testing.T) {
    sut := setupTests(t)

    testId := primitive.NewObjectID()

    postRequest := &blog.UpdatePostRequest{
      Title:   "TestTitle",
      Content: "TestContent",
    }

    sut.Repository.EXPECT().UpdateById(gomock.Any(), testId, postRequest).Times(1).Return(nil)

    _ = sut.Service.UpdatePost(context.Background(), testId.Hex(), postRequest)
  })
}
