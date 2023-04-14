const express = require('express');
const fs = require('fs')

const app = express();

// middleware to read request body
app.use(express.json())

// server running
app.listen( 4000, () => {
    console.log("server is running");
})


// reading data from file synchromous
const fileData = fs.readFileSync(`${__dirname}/data/tours1.json`, 'utf-8');
const allTours = JSON.parse(fileData)



const getAllTours = (req, res) => {
    res.status(200).json({
        status: "successfull",
        total: allTours.length,
        data : allTours
    })
}

const createTour = (req, res) => {
    const newTourObj = req.body
    const newList = [...allTours, newTourObj ]
    fs.writeFile(`${__dirname}/data/tours1.json`, JSON.stringify(newList), (err) => {
        if(err) return res.status(500).send("Internal server error")
        else return res.status(201).send({
            status: 'successfull',
            message: "New tour created."
        })
    })
}

const updateTours = (req, res) => {
    const tourId = req.params.id;
    res.send("Tour updated")
}


app.get('/api/v1/tours', getAllTours)

app.post('/api/v1/tours', createTour)

app.patch('/api/v1/tours/:id', updateTours)