// This is one possible approach out of many

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Something went wrong...'  // Generic message

    // TODO: Add error-page for rendering

    console.log('err from global handler: ' + err);
    console.log(err.message);

    res.status(err.status).render('home', { error: err });

    // No use of next() because this is the last wall defending the app not to fall apart
};