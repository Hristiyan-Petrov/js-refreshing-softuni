const { errors } = require("../config");

// Currently authorized equals logged in
module.exports = (req, res, next) => {

    // Show message from here, do not pass to the global error handler

    if (!req.user) {
        req.flash('error', errors.AUTHORIZATION);
        return res.redirect('/auth' + req.session.previousRoute || '/login');
    }

    // If there are roles check them in future
    next()
}