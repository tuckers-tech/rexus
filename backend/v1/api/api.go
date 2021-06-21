package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type ServerStatus struct {
    Status string `json:"status"`
}

func getApiStatus(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Match Status")
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func createConnection(writer http.ResponseWriter, request *http.Request) {
	fmt.Println(request.FormValue("name"))
	json.NewEncoder(writer).Encode(map[string]bool{"ok": true})
}

func GetApiRoutes(router *mux.Router) {
	router.HandleFunc("/status", getApiStatus)
	router.HandleFunc("/connection", createConnection).Methods("POST")
}