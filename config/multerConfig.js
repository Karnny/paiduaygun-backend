require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { v1: uuidv1 } = require('uuid');

const profileImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const photosDestination = path.join(__dirname, '../public/photos/profile');
        cb(null, photosDestination);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv1() + path.extname(file.originalname));
    }
});

const itemImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const photosDestination = path.join(__dirname, '../public/photos/item');
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
        cb("Error, this file type isn't allowed.");
    }
}

const handleProfileImageUpload = multer({
    storage: profileImageStorage,
    limits: {
        fileSize: 15000000 // limit file size to 15 MB
    },
    fileFilter: fileFilterHandler
});

const handleItemImageUpload = multer({
    storage: itemImageStorage,
    limits: {
        fileSize: 15000000 // limit file size to 15 MB
    },
    fileFilter: fileFilterHandler
});

module.exports = {
    multer,
    profileImageStorage,
    itemImageStorage,
    handleProfileImageUpload,
    handleItemImageUpload
}