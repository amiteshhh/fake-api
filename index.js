var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors({ origin: true, credentials: true }))

app.get('/', async function (req, res, next) {
    randomizeResponse(req, res);
    //   res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.get('/sample.js', async function (req, res, next) {
    const delay_ms = req.query.delay_ms || 1000;
    // const status = req.query.status || getRandomStatus();
    // res.status(status);
    console.log('sample.js')
    setTimeout(() =>  res.sendFile('sample.js', { root: __dirname }), delay_ms)
})

app.post('/', async function (req, res, next) {
    randomizeResponse(req, res);
})

app.listen(8091, function () {
    console.log('CORS-enabled web server listening on port 8091')
})

function randomizeResponse(req, res) {
    const delay_ms = req.query.delay_ms || 1000;
    const status = req.query.status || getRandomStatus();
    res.status(status);
    setTimeout(() => res.json({ id: Date.now(), text: 'some random response', status: status }), delay_ms)
}

function getRandomStatus() {
    return Math.random() < 0.5 ? 200 : 400;
}