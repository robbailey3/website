# syntax=docker/dockerfile:1
FROM node:22-alpine AS uibuild

WORKDIR /usr/ui

COPY ./ui ./

RUN yarn install
RUN yarn run build

FROM golang:1.25-alpine AS apibuild

WORKDIR /usr/api

COPY go.mod ./
COPY go.sum ./
COPY --from=uibuild ./usr/ui/dist ./public
RUN go mod tidy

COPY . ./

RUN go build -o /server

EXPOSE 8080

CMD [ "/server" ]
