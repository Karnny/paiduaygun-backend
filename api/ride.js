const express = require('express');
const { USER_ROLE } = require('../config/constant');
const api = express.Router();

const rideController = require('../controller/rideController');
const {catchError} = require('../middlewares/errorHandler');
const useAuth = require('../middlewares/jwt-auth');

api.post('/api/addRide' , useAuth([USER_ROLE.USER]) ,catchError(rideController.addRide));
api.get('/api/allRide' , catchError(rideController.showRide));
api.get('/api/detailRide' , catchError(rideController.showDetailRide));
api.get('/api/showRidebySearch' , catchError(rideController.showRidebySearch));

api.get('/api/bookingTrip/:tripID' , catchError(rideController.bookingTrip));


module.exports = api;
