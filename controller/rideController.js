const ride = require('../model/ride');
const user = require('../model/user');

exports.addRide = async (req, res) => {
    const userID = req.userData.id
    const addRide = await ride.createRide(req.body);
    if (addRide.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_CREATE_RIDE_ERROR",
            message: "Cannot create new Ride"
        }
    }

    const updatePostAmount = await user.updatePostAmount({ userID });
    if (updatePostAmount.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_UPDATE_POST_AMOUNT_ERROR",
            message: "Cannot Update Post amount"
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

exports.showRidebySearch = async (req, res) => {
    console.log(req.query);
    const { from, to, date, person, gender, agemin, agemax, pricemin, pricemax, lat, lon } = req.query;
    const getshowRidebySearch = await ride.showRidebySearch({ from: from, to: to, date: date, person: person, gender: gender, agemin: agemin, agemax: agemax, pricemin: pricemin, pricemax: pricemax });
    const nearbyfilter = getshowRidebySearch.filter(row => {
        const lat1 = Number(row.ride_orginin_latitude) * Math.PI / 180;
        const lon1 = Number(row.ride_orginin_longtitude) * Math.PI / 180;
        const lat2 = Number(lat) * Math.PI / 180;
        const lon2 = Number(lon) * Math.PI / 180;

        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 6371;
        let MaxnearbyDistance = 30
        return (c * r) <= MaxnearbyDistance;
    });
    if(lat == undefined || lon == undefined) {
        res.json(getshowRidebySearch);
    } else {
        res.json(nearbyfilter);
    }
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

    const updateAmountPass = await ride.updateAmountofPass(req.body);
    if(updateAmountPass.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_UPDATE_AMOUNT_PASSENGER_ERROR",
            message: "Cannot update amount of passenger"
        }
    }
    res.status(200).send({
        responseCode: 201,
        message: "Your Booking Ride Success",
        result: bookingRide
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

exports.choiceStatus = async (req, res) => {
    const choiceStatus = await ride.confirmTrip(req.body);
    if (choiceStatus.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_UPDATE_LAST_STATUS_ERROR",
            message: "Cannot Update Last Status"
        }
    }
    res.status(200).send({
        responseCode: 201,
        message: "Update Last Status Complete"
    })
}

exports.showDetailRide = async (req, res) => {
    const { tripID } = req.query;
    const getDetailRide = await ride.getDetailRide({ tripID: tripID })
    res.json(getDetailRide);
}

exports.showJoiner = async (req , res) => {
    const {tripID} = req.query;
    const getJoinerTrip = await ride.getJoinerTrip({tripID : tripID})
    res.json(getJoinerTrip);
}

// Show History Booking and Post
exports.showHistoryBooking = async (req , res) => {
    const {userID} = req.query;
    const getHistoryBooking = await ride.getHistoryBooking({userID : userID})
    res.json(getHistoryBooking);
}

exports.showHistoryPost = async (req , res) => {
    const {userID} = req.query;
    const getHistoryPost = await ride.getHistoryRiding({userID : userID})
    res.json(getHistoryPost);

}