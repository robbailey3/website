go install github.com/golang/mock/mockgen@v1.6.0
mockgen -source=blog/service.go -destination=mocks/blog/service.go
mockgen -source=blog/repository.go -destination=mocks/blog/repository.go
