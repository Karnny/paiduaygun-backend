const express = require('express');
const { USER_ROLE } = require('../config/constant');
const api = express.Router();

const rideController = require('../controller/rideController');
const {catchError} = require('../middlewares/errorHandler');
const useAuth = require('../middlewares/jwt-auth');

api.post('/api/addRide', useAuth([USER_ROLE.USER]) ,catchError(rideController.addRide));
// api.get('/api/allRide' , catchError(rideController.showRide));
// Get Detail and Joiner
api.get('/api/detailRide'  , catchError(rideController.showDetailRide));
api.get('/api/joinerTrip' , catchError(rideController.showJoiner));

api.get('/api/showRidebySearch' , catchError(rideController.showRidebySearch));

// Booking Trip
api.post('/api/bookingTrip' , useAuth([USER_ROLE.USER])  , catchError(rideController.bookingTrip));
//Update Payment Status
api.post('/api/updateStatus' , useAuth([USER_ROLE.USER])  , catchError(rideController.updateStatus)); 
// Update Last Status
api.post('/api/choiceStatus' , useAuth([USER_ROLE.USER])  , catchError(rideController.choiceStatus));

// Get History Detail
api.get('/api/historyBooking' , catchError(rideController.showHistoryBooking));
api.get('/api/historyRiding' , catchError(rideController.showHistoryPost));

module.exports = api;
