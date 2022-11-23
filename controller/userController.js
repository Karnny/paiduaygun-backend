require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

exports.userSignup = async (req , res) => {

    const checkUser = await user.getUser({username : req.body.username});
    if(checkUser.length != 0) {
        console.log(checkUser);
        throw {
            responseCode: 400,
            errorCode: "AUTH_USER_EXIST",
            message: "Username has already exist."
        }
    }

    const createUser = await user.createUser(req.body);
    if(createUser.affectedRows != 1) {
        throw {
            responseCode: 400,
            errorCode: "AUTH_CREATE_USER_ERROR",
            message: "Cannot create account."
        }
    }

    res.status(200).send({
        responseCode:201,
        message: "Create Account Complete"
    });
}

exports.userSignin = async (req , res) => {
    const {username , password} = req.body;

    const checkUser = await user.getUser({username});
    if(checkUser.length != 1) {
        throw{
            responseCode: 404,
            message: "Username not found"
        }
    }

    const checkPassword = checkUser[0].user_password;
    if(!bcrypt.compareSync(password , checkPassword)) {
        throw{
            responseCode: 404,
            message: "Wrong Password"
        }
    }

    const payload = {
        id: checkUser[0].users_id,
        username: checkUser[0].user_username,
        password: checkUser[0].user_password,
        firstname: checkUser[0].user_firstname,
        lastname: checkUser[0].user_lastname,
        gender: checkUser[0].user_gender,
        age: checkUser[0].user_age,
        email: checkUser[0].user_email,
        phonenumber: checkUser[0].user_phonenum,
        othercon: checkUser[0].user_othercon,
        address: checkUser[0].user_address,
        role:checkUser[0].user_role
    }

    const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRES_IN});

    res.send({
        responseCode: 200,
        token: token,
        userData: payload
    })
}

exports.me = async(req , res) => {
    res.send(req.userData);
}
