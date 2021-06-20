package connections

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type ServerStatus struct {
    Status string `json:"status"`
}

func createConnection(writer http.ResponseWriter, request *http.Request) {
	fmt.Println("Match Connections")
	json.NewEncoder(writer).Encode(map[string]bool{"ok": true})
}

func GetConnectionRoutes(router *mux.Router) {
	router.HandleFunc("/", createConnection)
}