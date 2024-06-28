// This is one possible approach out of many

module.exports = (err, req, res, next) => {
    console.log('HERE');
    // console.log(err);

    err.status = err.status || 500;

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

    // console.log(res.locals?.view);
    // console.log(res.locals.view?.substring(1));

    let viewPath = res.locals.view;

    if (viewPath?.includes('edit')) {
        viewPath = 'ads/edit';
    } else {
        viewPath = res.locals.view?.substring(1);
    }

    res.status(err.status).render(viewPath || 'error/404', {
        error: errorMessages,
        oldInput: req.body    // keep the valid form data on the corresponding field
    });
};