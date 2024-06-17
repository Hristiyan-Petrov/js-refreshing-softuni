import config from '../config/config.js';
import jwt from 'jsonwebtoken';

export default function () {
    return (req, res, next) => {

        let token = req.cookies[config.development.JWT_COOKIE_NAME];

        if (token) {
            // Verify token
            jwt.verify(token, config.development.SECRET_KEY, (err, decoded) => {
                if (err) {
                    // TO DO: Handle invalid token
                    res.clearCookie(config.development.JWT_COOKIE_NAME);
                }

                // Access it after that from req.user in controllers 
                req.user = decoded;     // { _id: '666db15d17433a6abacfe69b',roles: [ 'admin' ], iat: 1718464923 }    

                res.locals.user = decoded;  // property to set variables accessible in templates rendered with res.render
                res.locals.isAuthenticated = true;
            });
        }

        next();
    };
}