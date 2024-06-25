export default (req, res, next) => {
    // Guard

    if (!req.user) {     // Set after login
        res.redirect('/auth/login');
        return;
    }

    next();
}