export default (req, res, next) => {
    // Guard

    if (req.user) {     // Set after login
        res.redirect('/cubes');
        return;
    }

    next();
}