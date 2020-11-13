package main

import (
	"encoding/json"
	"fmt"
	"log"
	m "mining/findnonce"
	"net/http"

	"github.com/gorilla/mux"
)

type block struct {
	Hash       string
	Nonce      int
	Complexity int
}

func mine(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	fmt.Print(r.Method)
	var b block

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&b)
	if err != nil {
		panic(err)
	}

	var out m.Block = m.Mine(b.Hash, b.Complexity, 2)

	switch r.Method {
	case "POST":
		w.WriteHeader(http.StatusOK)
		rMinedBlock, err := json.Marshal(out)
		if err != nil {
			panic(err)
		}
		w.Write([]byte(rMinedBlock))
	default:
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"nonce:" "0"}`))
	}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/encrypt/mine", mine)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}
