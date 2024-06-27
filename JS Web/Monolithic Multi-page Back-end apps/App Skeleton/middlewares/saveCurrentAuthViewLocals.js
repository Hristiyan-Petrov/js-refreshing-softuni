module.exports = (req, res, next) => {
    res.locals.view = `auth/${req.path}`;
    next();
}