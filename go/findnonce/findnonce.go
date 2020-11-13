package mining

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
)

type Block struct {
	Hash       string
	Nonce      int
	Complexity int
}

var out Block

func worker(jobs <-chan int, results chan<- int, data string, complex int) {
	for {
		n := <-jobs
		r := findNonce(data, n, complex)
		if r != 0 {
			results <- r
			break
		}
	}
	close(results)
}

func findNonce(data string, nonce int, complexity int) int {
	const complexStr = "00000000000000000000000000000000"
	h := sha256.Sum256([]byte(data + strconv.Itoa(nonce)))
	s := hex.EncodeToString(h[:])
	if s[:complexity] == complexStr[:complexity] {
        fmt.Println(data+strconv.Itoa(nonce))
		out.Nonce = nonce
		out.Hash = s
		out.Complexity = complexity
		return nonce
	}
	return 0
}

func Mine(data string, complex int, nThread int) Block {
	jobs := make(chan int)
	results := make(chan int, 1)

	for i := 1; i <= nThread; i++ {
		fmt.Println("Thread ", i, " Init")
		go worker(jobs, results, data, complex)
	}

loop:
	for i := 0; true; i++ {
		select {
		case <-results:
			break loop
		default:
			jobs <- i
		}
	}
	close(jobs)

	fmt.Println(out.Nonce)
	return out
}

func main() {
	Mine("loren", 5, 2)
	return
}
