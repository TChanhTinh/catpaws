const express = require('express')
const app = express()
const PORT = 9000

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.listen(PORT, (req, res) => {
    console.log(`Host is up at localhost:${PORT}`)
})