go install github.com/golang/mock/mockgen@v1.6.0
mockgen -source=blog/service.go -destination=mocks/blog/service.go
mockgen -source=blog/repository.go -destination=mocks/blog/repository.go
mockgen -source=hermod/hermod.go -destination=mocks/hermod/hermod.go
mockgen -source=github/client.go -destination=mocks/github/client.go
mockgen -source=github/service.go -destination=mocks/github/service.go
mockgen -source=secrets/client.go -destination=mocks/secrets/client.go
