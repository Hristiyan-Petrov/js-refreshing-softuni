// This is one possible approach out of many

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;

    let errorMessages = [];
    if (err.name === 'ValidationError') {
        // Splitting concatenated Mongoose error object messages
        errorMessages = err.message.split(', ').map(message => ({ message }));
    } else {
        err.message = err.message || err.msg || 'Something went wrong...';
        errorMessages = [{ message: err.message }];
    }

    // console.log('err from global handler: ', err);

    res.status(err.status).render(res.locals.view, {
        error: errorMessages,
        oldInput: req.body    // keep the valid form data on the corresponding field
    });
};