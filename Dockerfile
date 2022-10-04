# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine AS uibuild

WORKDIR /usr/ui
COPY ./ui/package.json ./
COPY ./ui/tsconfig.json ./
COPY ./ui/tsconfig.node.json ./
COPY ./ui/vite.config.ts ./
COPY ./ui/index.html ./
RUN npm install
COPY ./ui/src ./src
COPY ./ui/public ./public
RUN npm run build

FROM golang:1.19-alpine AS apibuild

WORKDIR /usr/api

COPY go.mod ./
COPY go.sum ./
COPY --from=uibuild ./usr/ui/dist ./public
RUN go mod tidy

COPY . ./

RUN go build -o /server

EXPOSE 8080

CMD [ "/server" ]
