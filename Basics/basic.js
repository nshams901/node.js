//importing file system module;

const fs = require('fs')

fs.readFileSync('./file-test.txt', (err, data) => {
    console.log(data);
})

module.exports = "Basic"