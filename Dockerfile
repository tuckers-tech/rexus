FROM node:14-alpine as build-stage
RUN npm install -g npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM node:14-alpine as production-stage
# RUN npm install -g npm
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY ./server.js /app/server.js
# COPY ./backend /app/backend
# COPY --from=build-stage /app/dist /app/static
# CMD [ "node", "server.js" ]

FROM golang:1.16-alpine

RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app

# We want to populate the module cache based on the go.{mod,sum} files.
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY ./server.go ./server.go
COPY ./backend ./backend

# Build the Go app
RUN go build -o ./rexus .

COPY --from=build-stage /app/static /app/static

# This container exposes port 4375 to the outside world
EXPOSE 4375

# Run the binary program produced by `go install`
CMD ["./rexus"]