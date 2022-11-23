exports.USER_ROLE = {
    ADMIN: 1,
    USER: 2,

    get allAsArray() {
        return [this.ADMIN, this.USER];
    }
}

exports.MULTIPART_IMAGE_UPLOAD_FIELDS = {
    REGISTER_IMAGES: [
        {
            name: 'driverlicense', maxCount: 1
        },
        {
            name: 'idcard', maxCount: 1
        }
    ]
}

