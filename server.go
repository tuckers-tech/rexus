package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Article struct {
    Title string `json:"Title"`
    Desc string `json:"desc"`
    Content string `json:"content"`
}

func getServerStatus(w http.ResponseWriter, r *http.Request) {
    Articles := []Article{
        {Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        {Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }
    fmt.Println("Endpoint Hit: returnAllArticles")
    json.NewEncoder(w).Encode(Articles)
}


func watchRoutes() {
    
    fs := http.FileServer(http.Dir("./static"))
    http.Handle("/", fs)
    http.HandleFunc("/status", getServerStatus)
    fmt.Println("Handling Requests on http://localhost:4375")
    http.ListenAndServe(":4375", nil)
    // log.Fatal(http.ListenAndServe(":10000", nil))
}

func main() {
    watchRoutes()
}