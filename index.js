const express = require('express')
const cryptojs = require('crypto-js')
const app = express()
const PORT = 9000

app.listen(PORT, (req, res) => {
    console.log(`Host is up at localhost:${PORT}`)
})