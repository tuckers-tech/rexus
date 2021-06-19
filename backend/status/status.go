package status

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type ServerStatus struct {
    Status string `json:"status"`
}

func getServerStatus(w http.ResponseWriter, r *http.Request) {
	
	status := ServerStatus{Status: "green"}

    fmt.Println("Endpoint Hit: returnAllArticles")
    json.NewEncoder(w).Encode(status)
}

func getStatusRouter() (*mux.Router) {
	router := mux.NewRouter()

	router.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
		// an example API handler
		json.NewEncoder(w).Encode(map[string]bool{"ok": true})
	})

	return router
}