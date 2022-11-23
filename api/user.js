const express = require('express');
const api = express.Router();
const useAuth = require('../middlewares/jwt-auth');
const { USER_ROLE, MULTIPART_IMAGE_UPLOAD_FIELDS } = require('../config/constant');

const userController = require('../controller/userController');
const { catchError } = require('../middlewares/errorHandler');
const { handleCredentialImageUpload } = require('../config/multerConfig');


api.post('/api/signup',
    handleCredentialImageUpload.fields(MULTIPART_IMAGE_UPLOAD_FIELDS.REGISTER_IMAGES),
    catchError(userController.userSignup)
);

api.post('/api/signin', catchError(userController.userSignin));

api.get('/api/me', useAuth(USER_ROLE.allAsArray), catchError(userController.me));

module.exports = api;




