// This is one possible approach out of many

module.exports = (err, req, res, next) => {
    err.status = err.status || 500;

    console.log(err);

    let errorMessages = [];
    if (err.name === 'ValidationError') {
        // Splitting concatenated Mongoose error object messages
        errorMessages = err.message
            .slice('User validation failed: '.length)
            .split(', ')
            .map(mess => ({ message: mess.split(':')[1] }));
        console.log(errorMessages);
    } else {
        err.message = err.message || err.msg || 'Something went wrong...';
        errorMessages = [{ message: err.message }];
    }

    // console.log('err from global handler: ', err);


    // req.session.error = errorMessages;
    // req.session.oldInput = req.body;

    // console.log('err handler: ' + req.session.previousRoute);
    // res.redirect('/auth' + req.session.previousRoute);
    // res.redirect(res.locals.view);


    res.status(err.status).render(res.locals.view.substring(1), {
        error: errorMessages,
        oldInput: req.body    // keep the valid form data on the corresponding field
    });
};