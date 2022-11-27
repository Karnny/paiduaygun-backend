const express = require('express');
const api = express.Router();

const rideController = require('../controller/rideController');
const {catchError} = require('../middlewares/errorHandler');

api.post('/api/addRide' , catchError(rideController.addRide));
api.get('/api/allRide' , catchError(rideController.showRide));
api.get('/api/detailRide' , catchError(rideController.showDetailRide));

api.get('/api/bookingTrip/:tripID' , catchError(rideController.bookingTrip));


module.exports = api;
