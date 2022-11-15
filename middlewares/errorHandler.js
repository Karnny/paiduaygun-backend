

exports.useHandler = (err, req, res, next) => {
    console.log("Error:\n", err);
    if (err.responseCode) {
        return res.status(err.responseCode).send({
            responseCode: err.responseCode,
            errorCode: err.errorCode,
            message: err.message || "Error, something went wrong.",
            sqlMessage: err.sqlMessage
        });
    }

    res.status(500).send({
        responseCode: 500,
        errorCode: "TOP_LEVEL_ERR_FALLBACK_ERROR",
        message: err.message || "Error, something went wrong.",
        sqlMessage: err.sqlMessage
    });

}


exports.catchError = (fn) => {
    return (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);
}