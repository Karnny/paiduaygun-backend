
require('dotenv').config();
const jwt = require('jsonwebtoken');

const bypassAuth = process.env.BYPASS_AUTH === 'true' ? true : false;

module.exports = (allowedRoles = [], protocol = 'http') => {

    function auth({ ws, req, res, next }) {
        if (bypassAuth) {
            req.userData = {
                user_id: 0
            }
            return next();
        }

        const cookieName = process.env.COOKIE_NAME || 'token';
        let headerToken = req.headers['Authorization'] || req.headers['authorization'];
        let cookieToken = req.cookies?.cookieName;


        if ([null, undefined, ''].includes(headerToken)) {

            if ([null, undefined, ''].includes(cookieToken)) {
                req.userData = null;
                process.env.SERVER_LOG_VERBOSE < '1' ? null : console.log("Unauthorized, no token.");
                return res.status(401).json({
                    code: 401,
                    message: "Unauthorized.",
                });
            } else {
                verifyToken(cookieToken);
            }


        } else {
            headerToken = headerToken.split(' ')[1];
            verifyToken(headerToken);
        }


        function verifyToken(token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
                if (error) {
                    req.userData = null;
                    process.env.SERVER_LOG_VERBOSE < '1' ? null : console.log("Verify token error, or expired!");
                    return res.status(401).json({
                        code: 401,
                        message: "Verify token error.",
                    });
                } else {
                    
                    if (allowedRoles.includes(decodedToken.role)) {
                        req.userData = decodedToken;
                        return next();
                    } else {
                        return res.status(403).json({
                            code: 403,
                            message: "Permission denied.",
                        });
                    }

                }
            });
        }
    }

    const verifyMethods = {

        ws: function (ws, req, next) {
            auth({ ws, req, next });
        },

        http: function (req, res, next) {
            auth({ req, res, next });
        }
    }

    return verifyMethods[protocol];


}

