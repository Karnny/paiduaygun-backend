const express = require('express');
const api = express.Router();

const rideController = require('../controller/rideController');
const {catchError} = require('../middlewares/errorHandler');

api.get('/api/allRide' , catchError(rideController.showRide));
api.get('/api/detailRide' , catchError(rideController.showDetailRide));


module.exports = api;
