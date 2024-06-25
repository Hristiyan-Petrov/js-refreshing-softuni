module.exports = (req, res, next) => {
    console.log('hello from locals saver! View dir is: ' + req.locals);
    res.locals.view = `auth/${req.path}`;
    next();
}