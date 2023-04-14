const http = require('node:http');
const fs = require('fs');

const host = 'localhost';
const port = 8000;



//------------------------------- 1) request handler function ------------------------------------------
// const requestHandler = (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: 'Hello World!',
//     }));
// }



//----------------------------- 2) Listen to the each and every request event ---------------------------------
// server.on('request', (request, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: 'Hello World!',
//     }));
// });


//-------------------------------------- 3) Serving json data ---------------------------------
// const requestHandler = (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{ "name": "nehal"}`);
// }



//------------------------------------- 3) Serving csv file ----------------------------------------
// When we return CSV responses, most modern browsers automatically download the file even if the Content-Disposition header is not set.

// const requestHandler = (req, res) => {
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv"); // downloded file name will be oceanpals.csv
//     res.writeHead(200);
//     res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
// }



//------------------------------------- 3) Serving HTML file ----------------------------------------
// const requestHandler = (req, res) => {
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(`<html><body><h1 style=color:green>This is HTML</h1></body></html>`);
// }



// *************************************************************************
//------------------------------------- 3) Serving HTML file from separate file ----------------------------------------
// const requestHandler = function(req, res) {
//     fs.readFile(__dirname + "./test.html").then((res) => {
//         res.setHeader("Content-Type", "text/html");
//         res.writeHead(200);
//         res.end(`<html><body><h1 style=color:green>This is HTML</h1></body></html>`);
//     }).catch(err => {
//         res.writeHead(500);
//         res.end(err);
//         // return;
//     })
// }






//------------------------------------ Create a local server to receive data -----------------------
const server = http.createServer(requestHandler);


//------------------------------------ server running on specified port: ---------------------------------------
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});