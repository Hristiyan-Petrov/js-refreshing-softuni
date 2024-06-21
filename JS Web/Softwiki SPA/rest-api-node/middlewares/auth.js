const jwt = require('jsonwebtoken');
const config = require('../config');

module.auth = (req, res, next) => {
    let authHeader = req.get('Authorization');

    if (authHeader) {
        let token = authHeader.split(' ')[1];

        jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                // DO SOMETHING

                res.json({ success: false, message: err.message });
            }

            // console.log(decoded);
            req.user = decoded;
        });
    } else {
        console.log('not logged in');
        return res.status(400).json({ message: 'You need to login.' });
    }

    console.log('heree');
    next();
};

module.isAuth = (req, res, next) => {
    // TODO: check if is auth
    console.log(req.user);

    // If is not logged in
    if (!req.user) {
        res.status(401).json({ errorData: 'You do not have the rights for this' });
    }

    next();
};

module.exports = module;