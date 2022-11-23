exports.USER_ROLE = {
    ADMIN: 1,
    USER: 2,

    get allAsArray() {
        return [this.ADMIN, this.USER];
    }
}

exports.MULTIPART_IMAGE_UPLOAD_FIELD_NAME= {
    REGISTER_IMAGE: 'REGISTER_IMAGE'
    // Define multer image field here
}

