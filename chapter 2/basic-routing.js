const express = require('express');

const app = express();

app.listen(4000, () => {
    console.log("App running on port 4000");
});

// ----------------------------- execute callback function on get request ------------------------
// app.get("/", (req, res) => {
//     // ------------ text data --------------
//     // res.status(200).send("Hello from express");

//     //  ----------- json data --------------
//     res.status(200).json({ message: "Hello from server side", name: "express"});
// })


// --------------------------- execute callback function on post request ---------------------------
// app.post("/", (req, res) =>{
//     res.send("This is a post request");
//     res.end()
// })



// --------------------- execute callback function on all request --------------------
// app.all('/', function(req, res){
//     res.send("HTTP method doesn't have any effect on this route!");
//     res.end()
//  });