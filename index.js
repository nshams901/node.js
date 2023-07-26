
const express = require('express');
const EventEmitter = require('events');;
const getApiCount = require('./event/event')

const event = new EventEmitter();

const app = express();

app.use('/', ( req, res, next) => {

    // A function that count how many times we call our API
    getApiCount(req, res, next);
    res.send('API CALL')
})

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000')
})
