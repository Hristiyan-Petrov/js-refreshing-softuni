module.exports = function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.notification = req.flash("notification");
    next();
};