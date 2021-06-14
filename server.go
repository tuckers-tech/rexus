package main

import (
	"net/http"
)

func main() {
    
    // rdb := redis.NewClient(&redis.Options{
    //     Addr:     "localhost:6379",
    //     Password: "", // no password set
    //     DB:       0,  // use default DB
    // })

    http.Handle("/", http.FileServer(http.Dir("./static")))
    http.ListenAndServe(":4375", nil)
}