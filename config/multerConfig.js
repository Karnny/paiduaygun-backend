require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { v1: uuidv1 } = require('uuid');

const credentialImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const photosDestination = path.join(__dirname, '../public/photos/credential');
        cb(null, photosDestination);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv1() + path.extname(file.originalname));
    }
});


const fileFilterHandler = (req, file, cb) => {
    const allowedFileExtension = /jpeg|jpg|png|gif/;
    const isValidFileExtension = allowedFileExtension.test(path.extname(file.originalname).toLowerCase());
    const isValidMimeType = allowedFileExtension.test(file.mimetype);

    if (isValidMimeType && isValidFileExtension) {
        return cb(null, true);
    } else {
        cb({
            responseCode: 400,
            errorCode: "FILE_UPLOAD-FILE_TYPE_NOT_ALLOWED",
            message: "Error, file type not allowed."
        });
    }
}

const handleCredentialImageUpload = multer({
    storage: credentialImageStorage,
    limits: {
        fileSize: 15000000 // limit file size to 15 MB
    },
    fileFilter: fileFilterHandler
});



module.exports = {
    multer,
    credentialImageStorage,
    handleCredentialImageUpload,

}