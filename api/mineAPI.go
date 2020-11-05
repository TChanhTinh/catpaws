package main

import (
     "crypto/sha256"
     "encoding/hex"
     "encoding/json"
     "net/http"
     "log"
)

type block struct {
     Hash string
     Nonce int
}

func findNonce(data string) block {
     nonce := 0
     complexVal := 5
     complexStr := "00000000000000000000000000000000";
     var b block
     for {
          h := sha256.Sum256([]byte(string(nonce)+data))
          s := hex.EncodeToString(h[:])
          if s[:complexVal] == complexStr[:complexVal] {
               b.Nonce = nonce
               b.Hash = s
               break
          }
          nonce++
     }
     return b
}

func mine(w http.ResponseWriter, r *http.Request) {
     w.Header().Set("Content-Type", "application/json")
     w.WriteHeader(http.StatusOK)
     var b block
     decoder := json.NewDecoder(r.Body)
     err := decoder.Decode(&b); if err != nil {
          panic(err)
     }

     var out block = findNonce(b.Hash)

     switch r.Method {
     case "POST":
          w.WriteHeader(http.StatusOK)
          rMinedBlock, err := json.Marshal(out); if err != nil {
               panic(err)
          }
          w.Write([]byte(rMinedBlock))
     default:
          w.WriteHeader(http.StatusNotFound)
          w.Write([]byte(`{"nonce:" "0"}`))
     }
}

func main() {
     http.HandleFunc("/encrypt/mine", mine)
     log.Fatal(http.ListenAndServe(":8080", nil))
}
