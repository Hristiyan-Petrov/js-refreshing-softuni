module.exports = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Something went wrong!';

    console.log(err);

    res.status(err.status).json({ message: err.message, type: 'Error/Warning' });
    
    // No need for next. This handler is the last wall.
};