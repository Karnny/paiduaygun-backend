const { mysql, mysqlConnection: db } = require('../config/mysqlConfig');

exports.createRide = async ({
    origin,
    destination,
    pickupspot,
    origindatetime,
    origin_lat,
    origin_long,
    destinationdatetime,
    destination_lat,
    destination_long,
    licensecar,
    trunkspace,
    seatnum,
    babyseatnum,
    pet,
    music,
    smoke,
    otherdetail,
    passenger,
    priceperpass,
    ridestatus,
    carid,
    ownerrideid

}) => {
    const sql = "INSERT INTO ride(ride.ride_origin , ride.ride_destination , ride.ride_pickup , ride.ride_origindatetime , ride.ride_orginin_latitude , ride.ride_orginin_longtitude , ride.ride_destinationdatetime , ride.ride_destination_latitude , ride.ride_destination_longtitude , ride.ride_licensecar , ride.ride_trunkspace , ride.ride_seatnum , ride.ride_babysetnum , ride.ride_pet , ride.ride_music , ride.ride_smoke , ride.ride_otherdetail , ride.ride_passenger , ride.ride_priceperpass , ride.ride_status , ride.ride_nowhaspass , ride.ride_rate , ride.ride_car_id , ride.rider_user_id) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,1 ,0 ,? ,? ,? )"

    const [createResult] = await db.query(sql, [
        origin,
        destination,
        pickupspot,
        origindatetime,
        origin_lat,
        origin_long,
        destinationdatetime,
        destination_lat,
        destination_long,
        licensecar,
        trunkspace,
        seatnum,
        babyseatnum,
        pet,
        music,
        smoke,
        otherdetail,
        passenger,
        priceperpass,
        ridestatus,
        carid,
        ownerrideid
    ]);
    return createResult;
}

// Select All Trip 
exports.allTrip = async () => {
    const sql = "SELECT users.user_firstname , users.user_lastname , users.user_rate , ride.ride_origin , ride.ride_destination , ride.ride_origindatetime , ride.ride_destinationdatetime , ride.ride_passenger , ride.ride_nowhaspass , ride.ride_priceperpass FROM ride JOIN users ON ride.rider_user_id = users.user_id AND ride.ride_status = 1"
    const [resultAllTrip] = await db.query(sql);
    return resultAllTrip;
}

// Show Detail of Ride
exports.getDetailRide = async ({rideID}) => {
    const sql = 'SELECT ride.ride_nowhaspass,ride.ride_origindatetime,ride.ride_destination_latitude,ride.ride_origin,ride.ride_destination,ride.ride_licensecar,ride.ride_trunkspace,ride.ride_seatnum,ride.ride_babysetnum,ride.ride_pet,ride.ride_music,ride.ride_smoke,ride.ride_otherdetail,users.user_firstname,users.user_lastname,users.user_gender,users.user_age,users.user_email,users.user_othercon,users.user_rate,ride.ride_priceperpass,ride.ride_pickup,users.user_firstname AS firstname_haveTrip ,users.user_lastname AS lastname_haveTrip, users.user_age AS age_haveTripFROM ride JOIN usersON ride.rider_user_id = users.user_idJOIN user_have_trip ON user_have_trip.trip_user_id = users.user_id WHERE ride_id=?';
    const [resultDetailRide] = await db.query(sql,[rideID]);
    return resultDetailRide;
} 

// Book This Ride
exports.bookRide = async ({userBookID , tripID}) => {
    const sql = 'INSERT INTO user_have_trip(user_have_trip.trip_bookingstatus , user_have_trip.trip_paymentstatus , user_have_trip.trip_user_id , user_have_trip.trip_ride_id) VALUES (1 , 1 , ? , ?)'
    const [bookingResult] = await db.query(sql , [userBookID , tripID]);
    return bookingResult
}



// ====================== History ============================
// History From Booking
exports.getHistoryBooking = async ({ id }) => {
    const sql = 'SELECT ride.ride_origin , ride.ride_destination , ride.ride_origindatetime , ride.ride_destinationdatetime, ride.ride_passenger , ride.ride_nowhaspass , ride.ride_status , ride.ride_priceperpass FROM ride JOIN user_have_trip ON ride.ride_id = user_have_trip.trip_ride_id AND user_have_trip.trip_user_id = ?'
    const resultHistoryBooking = await db.query(sql, id);
    return resultHistoryBooking;
}

// History From Riding
exports.getHistoryRiding = async ({ id }) => {
    const sql = 'SELECT * FROM ride WHERE ride.rider_user_id = ?'
    const resultHistoryRiding = await db.query(sql, id);
    return resultHistoryRiding;
}