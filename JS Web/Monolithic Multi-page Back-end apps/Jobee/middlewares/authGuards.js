const { errors } = require("../config");

// Currently authorized equals logged in
exports.isAuthorized = (req, res, next) => {

    // Show message from here, do not pass to the global error handler

    if (!req.user) {
        req.flash('error', errors.IS_AUTHORIZED);
        return res.redirect('/auth/login');
    }

    // If there are roles check them in future
    next()
};

exports.isGuest = (req, res, next) => {

    if (req.user) {
        req.flash('error', errors.IS_GUEST);
        return res.redirect(req.session.previousRoute || '/');
    }

    // If there are roles check them in future
    next()
};