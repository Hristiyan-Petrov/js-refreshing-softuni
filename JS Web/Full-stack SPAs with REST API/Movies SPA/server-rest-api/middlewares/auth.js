const jwt = require('jsonwebtoken');

// Route guards

module.auth = (req, res, next) => {

    let authHeader = req.get('Authorization');      // Get from req headers; It is set after login

    if (authHeader) {
        let token = authHeader.split(' ')[1];       // 'Authorization': `Bearer ${token}`

        try {
            let decoded = jwt.verify(token, 'SUPERSECRET');     //  {_id: user._id,username: user.username}

            // Impoertant. Set user info from token to req object
            req.user = decoded;     // or attach whole user which will be retrieved from db
        } catch (error) {
            console.log(error);
            // Even if is not logged in don't stop the program
            return next();
        }
    }

    next();
}

module.isAuth = (req, res, next) => {
    // TODO: check if is auth

    // If is not logged in
    if (!req.user) {
        res.status(401).json({ errorData: 'You do not have the rights for this' });
    }

    next();
}

module.exports = module;