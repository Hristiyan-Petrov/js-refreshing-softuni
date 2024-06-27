module.exports = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(req.path);

        if (req.session.currentRoute && req.session.currentRoute !== req.path) {
            req.session.previousRoute = req.session.currentRoute;
        }
        req.session.currentRoute = req.path;
    }
    next();
}