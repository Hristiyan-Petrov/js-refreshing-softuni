module.exports = (req, res, next) => {
    res.locals.view = req.originalUrl;
    next();
}