// This is one possible approach out of many

module.exports = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || 'Something went wrong...'  // Generic message

    // TODO: Add error-page for rendering

    // No use of next() because this is the last wall defending the app not to fall apart
};