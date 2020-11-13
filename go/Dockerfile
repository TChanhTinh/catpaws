FROM golang:alpine

RUN mkdir /api
WORKDIR /api
ADD . /api

EXPOSE 8080

RUN go get -u github.com/gorilla/mux
    
CMD go run mineAPI.go
