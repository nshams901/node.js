const EventEmitter = require('events');

const event = new EventEmitter();
let count = 0;

event.on('APICALL', () => {
    count ++;
    console.log(`API call ${count} times`)
});

const getApiCount = ( req, res, next) => {
    event.emit('APICALL');
}

module.exports = getApiCount;