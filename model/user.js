const {mysql , mysqlConnection: db} = require('../config/mysqlConfig');
const bcrypt = require('bcrypt');


exports.createUser = async ({
      username,
      password,
      firstname,
      lastname,
      gender,
      age,
      email,
      phonenum,
      othercon,
      address,
      latitude,
      longtitude,
      idcard,
      driverlicense,
}) => {
    const hashPassword = bcrypt.hashSync(password , 10);
    const sql = `INSERT INTO users 
    (users.user_username , users.user_password , users.user_firstname , users.user_lastname , 
    users.user_gender , users.user_age , users.user_email , users.user_phonenum , 
    users.user_othercon , users.user_address , users.user_latitude , 
    users.user_longtitude , users.user_idcard , users.user_driverlicense , 
    users.user_isban , users.user_role) 
    VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , 1 , 2)`

    const [createUserResult] = await db.query(sql , [
        username,
        hashPassword,
        firstname,
        lastname,
        gender,
        age,
        email,
        phonenum,
        othercon,
        address,
        latitude,
        longtitude,
        idcard,
        driverlicense,
    ]);
    
    return createUserResult;
}



exports.getUser = async ({ id , username}) => {
    const sql = 'SELECT * FROM users WHERE users.user_id = ? OR users.user_username = ?';
    const [resultAllUser] = await db.query(sql , [id , username]);
    return resultAllUser;
}