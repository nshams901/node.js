const express = require('express');
const app = express();

const Tour = require('./../model/tourModel');


exports.createTour = async ( req, res) => {
    try{

        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
}
exports.getTours = async (req, res) => {
    try{
        const tours = await Tour.find()
        res.status(200).json({
            status: 'Success',
            results: tours.length,
            data: {
                tours
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            data: err
        })
    }

    res.status(200).send('tour')
}

exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.tourId);   //Tour.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            data: err
        })
    }
}

exports.updateTour = async (req, res) =>{
    try{
         const tour = Tour.findByIdAndUpdate(res.params.tourId, req.body)
    }catch(err){

    }
}
// const 