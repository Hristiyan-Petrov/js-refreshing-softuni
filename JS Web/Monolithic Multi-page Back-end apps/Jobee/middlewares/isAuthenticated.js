const jwt = require('jsonwebtoken');
const { SECRET, AUTH_COOKIE_NAME } = require('../config');

module.exports = (req, res, next) => {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if (token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                // expired or invalid token 
                res.clearCookie(AUTH_COOKIE_NAME);
                // res.redirect('/auth/login');
            } else {
                req.user = decoded;
                res.locals.user = decoded;
                res.locals.isAuth = true;
            }
        });
    }

    // We don't want to stop the req. There are guest users also.
    // If user is authenticated attach his data to req
    next();
}