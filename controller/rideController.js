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

exports.showRide = async (_req, res) => {
    res.json(await ride.allTrip())
}

exports.bookingTrip = async (req, res) => {
    const bookingRide = await ride.bookTrip(req.body);
    if (bookingRide.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_BOOKING_RIDE_ERROR",
            message: "Cannot booking this Ride"
        }
    }
    res.status(200).send({
        responseCode: 201,
        message: "Your Booking Ride Success"
    })
}

exports.updateStatus = async (req, res) => {
    const updateStatus = await ride.paymentStatus(req.body);
    if (updateStatus.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_UPDATE_STATUS_ERROR",
            message: "Cannot update Status booking and payment"
        }
    }
    res.status(200).send({
        responseCode: 201,
        message: "Update Status Complete"
    })
}

exports.choiceStatus = async (req , res) => {
    const choiceStatus = await ride.confirmTrip(req.body);
    if(choiceStatus.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_UPDATE_LAST_STATUS_ERROR",
            message: "Cannot Update Last Status"
        }
    }
    res.status(200).send({
        responseCode: 201,
        message: "Update Lase Status Complete"
    })
}

exports.showDetailRide = async (req, res) => {
    const {rideID} = req.query;
    const getDetailRide = await ride.getDetailRide({tripID: rideID})
    res.json(getDetailRide);
}
