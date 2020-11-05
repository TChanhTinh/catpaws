const express = require('express')
const bodyParser = require('body-parser')
const pg = require('pg')
const request = require('request')
const app = express()
app.use(bodyParser.json())
const PORT = 9000

const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:admin@localhost:5432/mineNonce'


const pool = new Pool({
    connectionString: connectionString,
})

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

app.get('/blockchain', async (req, res) => {
    const { rows } = await pool.query(`SELECT * FROM BLOCKCHAIN`)
    res.send(rows)
})

app.post('/mining', (req, res) => {
    console.log(req.body)
    const formData = {
        hash: req.body.hash,
        nonce: 0,
        complexity: req.body.complexity
    }
    request({
        method: 'PUT', 
        url: 'http://localhost:8080/encrypt/mine',
        headers: { 'Content-Type': 'application/json' },
        form: req.body
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err)
            return res.json({ success: false})
        }
        res.json({ success: true})
        console.log(body)
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Host is up at localhost:${PORT}`)
})