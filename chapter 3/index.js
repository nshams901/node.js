const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const app = express();

const tour = require('./router/tourRoute');

app.use('/tour', tour)

//---------------- database connection ----------------
const connectionURL = process.env.CONNECTION_STRING || ''
const connectDB = require('./db/connect')
connectDB(connectionURL)
    .then(() => {
            console.log("database connected")
            app.listen(4000, () => console.log("server is running on port 4000"))
    }).catch(err => console.log("database connection failed", err))

