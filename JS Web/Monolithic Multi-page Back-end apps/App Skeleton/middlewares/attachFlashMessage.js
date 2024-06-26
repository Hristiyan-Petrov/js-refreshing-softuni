module.exports = function (req, res, next) {
    res.locals.error = req.flash("error");
    next();
};