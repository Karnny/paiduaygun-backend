const { mysql, mysqlConnection: db } = require('../config/mysqlConfig');

// Users Add New Ride to System
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
    carid,
    ownerrideid

}) => {
    const sql = "INSERT INTO ride(ride.ride_origin , ride.ride_destination , ride.ride_pickup , ride.ride_origindatetime , ride.ride_orginin_latitude , ride.ride_orginin_longtitude , ride.ride_destinationdatetime , ride.ride_destination_latitude , ride.ride_destination_longtitude , ride.ride_licensecar , ride.ride_trunkspace , ride.ride_seatnum , ride.ride_babysetnum , ride.ride_pet , ride.ride_music , ride.ride_smoke , ride.ride_otherdetail , ride.ride_passenger , ride.ride_priceperpass , ride.ride_status , ride.ride_nowhaspass , ride.ride_rate , ride.ride_car_id , ride.rider_user_id) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,1 ,0 ,0 ,? ,? )"

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
exports.getDetailRide = async ({tripID}) => {
    const sql = 'SELECT ride.ride_origin , ride.ride_destination , ride.ride_pickup , ride.ride_origindatetime , ride.ride_destinationdatetime , ride.ride_car_id , ride.ride_licensecar , ride.ride_trunkspace , ride.ride_seatnum , ride.ride_babysetnum , ride.ride_pet , ride.ride_music , ride_smoke , ride.ride_otherdetail , ride.ride_passenger , ride.ride_nowhaspass , ride.ride_priceperpass , ride.ride_status , car.car_name ,ow.user_firstname , ow.user_lastname , ow.user_gender , ow.user_age , ow.user_rate , ow.user_othercon , ow.user_email , ow.user_phonenum FROM ride JOIN users ow ON ride.rider_user_id = ow.user_id  JOIN car ON car.car_id = ride.ride_car_id AND ride.ride_id = ?';
    const [resultDetailRide] = await db.query(sql,[tripID]);
    // console.log(tripID);
    return resultDetailRide;
} 

// Show Joiner In Trip
exports.getJoinerTrip = async ({tripID}) => {
    const sql = 'SELECT users.user_firstname , users.user_lastname , users.user_gender , users.user_age FROM user_have_trip JOIN users ON user_have_trip.trip_user_id = users.user_id WHERE user_have_trip.trip_ride_id = ?'
    const [resultJoiner] = await db.query(sql , [tripID]);
    return resultJoiner;
}

// Book This Ride
exports.bookTrip = async ({userBookID , rideID}) => {
    const sql = 'INSERT INTO user_have_trip(user_have_trip.trip_bookingstatus , user_have_trip.trip_paymentstatus , user_have_trip.trpibooking_datetime , user_have_trip.trip_user_id , user_have_trip.trip_ride_id) VALUES (1 , 1 , CURRENT_TIMESTAMP, ? , ?)'
    const [bookingResult] = await db.query(sql , [userBookID , rideID]);
    return bookingResult
}

// Update Amount of Passenger
exports.updateAmountofPass = async ({rideID}) => {
    const sql = 'UPDATE ride SET ride.ride_nowhaspass = ride.ride_nowhaspass + 1 WHERE ride.ride_id = ?'
    const [updateAmountResult] = await db.query(sql , [rideID]);
    return updateAmountResult
}

// DATEDIFF SQL = (SELECT TIMESTAMPDIFF(minute, CURRENT_TIMESTAMP , '2022-11-23 13:00:00' ) AS 'Minutes')

// If you not payment in 15 Minutes your booking is cancel
exports.notpayMent = async({tripID}) => {
    const sql = "SELECT TIMESTAMPDIFF(minute, CURRENT_TIMESTAMP , user_have_trip.trpibooking_datetime) AS 'Minutes' FROM user_have_trip"
    const [resultMinute] = await db.query(sql);
    if(resultMinute.Minutes < 15) {
        const sql = "UPDATE user_have_trip SET user_have_trip.trip_bookingstatus = 4 WHERE user_have_trip.trip_id = ? "
        const [resultNotpayment] = await db.query(sql , [tripID]);
        return resultNotpayment
    }
}

// Update Payment Status and Booking Status
exports.paymentStatus = async ({tripID}) => {
    const sql = 'UPDATE user_have_trip SET user_have_trip.trip_bookingstatus = 2 , user_have_trip.trip_paymentstatus = 2 WHERE user_have_trip.trip_id = ?'
    const [paymentResult] = await db.query(sql , [tripID]);
    return paymentResult
}

// Update Booking Status to 3 is User confirm to booking Trip
exports.confirmTrip = async ({choiceStatus , tripID}) => {
    const sql = 'UPDATE user_have_trip SET user_have_trip.trip_bookingstatus = ? WHERE user_have_trip.trip_id = ?'
    const [confirmResult] = await db.query(sql , [choiceStatus , tripID]);
    return confirmResult
}



// ====================== History ============================
// History From Booking
exports.getHistoryBooking = async ({ userID }) => {
    const sql = 'SELECT user_have_trip.trip_user_id , users.user_firstname , users.user_lastname , users.user_age , ride.ride_origin , ride.ride_destination , ride.ride_origindatetime , ride.ride_destinationdatetime , ride.ride_passenger , ride.ride_nowhaspass , ride.ride_priceperpass , ride.ride_rate FROM user_have_trip JOIN ride ON user_have_trip.trip_ride_id = ride.ride_id JOIN users ON user_have_trip.trip_user_id = users.user_id AND user_have_trip.trip_user_id = ?'
    const [resultHistoryBooking] = await db.query(sql, userID);
    return resultHistoryBooking;
}

// History From Riding
exports.getHistoryRiding = async ({ userID }) => {
    const sql = 'SELECT users.user_firstname , users.user_lastname , users.user_age , ride.ride_origin , ride.ride_destination , ride.ride_origindatetime , ride.ride_destinationdatetime , ride.ride_passenger , ride.ride_nowhaspass , ride.ride_priceperpass , ride.ride_rate FROM ride JOIN users ON ride.rider_user_id = users.user_id AND users.user_id = ?'
    const [resultHistoryRiding] = await db.query(sql, userID);
    return resultHistoryRiding;
}

// Search Filter
exports.showRidebySearch = async ({from , to , date , person , gender , agemin , agemax , pricemin , pricemax}) => {
    const sql = 'SELECT users.user_firstname, users.user_lastname, users.user_rate, users.user_gender, users.user_age, users.user_postamount , ride.ride_origin, ride.ride_destination, ride.ride_origindatetime, ride.ride_destinationdatetime, ride.ride_passenger, ride.ride_id ,ride.ride_nowhaspass, ride.ride_priceperpass,ride.ride_orginin_latitude , ride.ride_orginin_longtitude , (ride.ride_passenger - ride.ride_nowhaspass) AS "seat_available" FROM ride JOIN users ON ride.rider_user_id = users.user_id AND ride.ride_status = 1 WHERE ((ride.ride_origin LIKE ? OR ride.ride_destination LIKE ?)OR DATE(ride.ride_origindatetime) = ? OR users.user_gender = ?) AND ( users.user_age BETWEEN ? AND ? AND ride.ride_priceperpass BETWEEN ? AND ?) AND ( ride.ride_passenger - ride.ride_nowhaspass) >= ?'
    const [resultRidebySearch] = await db.query(sql , [`%${from}%` , `%${to}%` ,date , gender , agemin , agemax , pricemin , pricemax , person]);
    return resultRidebySearch;
}

