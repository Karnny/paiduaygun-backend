const ride = require('../model/ride');

exports.addRide = async (req, res) => {
    const addRide = await ride.createRide(req.body);
    if (addRide.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_CREATE_RIDE_ERROR",
            message: "Cannot create new Ride"
        }
    }

    res.status(200).send({
        responseCode: 201,
        message: "Create New Ride Complete"
    });
}

exports.bookingRide = async(req , res) => {
    const bookingRide = await ride.bookRide(req.body);
    if(bookingRide.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_BOOKING_RIDE_ERROR",
            message: "Cannot booking this Ride"
        }
    }
    res.status(200).send({
        responseCode:201,
        message: "Your Booking Ride Success"
    })
}

exports.showRide = async (_req, res) => {
    res.json(await ride.allTrip)
}

exports.showDetailRide = async (req , res) => {
    const rideID = req.body.rideID;
    res.json(await ride.getDetailRide);
}
