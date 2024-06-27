const jwt = require('jsonwebtoken');
const config = require('../config');

module.auth = (req, res, next) => {
    let authHeader = req.get('Authorization');

    if (authHeader) {
        // if token is NOT expired AND provided
        let token = authHeader.split(' ')[1];

        try {
            let decoded = jwt.verify(token, config.SECRET_KEY);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({ message: 'Session over. Please login again.' });
            // console.log('error from auth.js: ' + error.message);
        }
    }
    next();
};

module.isAuth = (req, res, next) => {
    // If is not logged in
    if (!req.user) {
        return res.status(401).json({ message: 'You need to login into your account to access this page.' });
    }

    next();
};

module.exports = module;