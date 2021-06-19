package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type ServerStatus struct {
    Status string `json:"status"`
}

func getApiStatus(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func GetApiRoutes(router *mux.Router) {
	router.HandleFunc("/status", getApiStatus)
}