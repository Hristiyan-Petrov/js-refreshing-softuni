const authService = require('../services/authService');
const { AUTH_COOKIE_NAME, errors } = require('../config');

exports.showRegister = (req, res) => {
    res.render('auth/register');
};

exports.register = (req, res, next) => {
    const { email, password, rePassword, description } = req.body;

    if (password !== rePassword) {
        req.flash('error', errors.PASSWORDS_DO_NOT_MATCH);
    }

    authService.register(email, password, rePassword, description)
        .then(createdUser => {
            res.redirect('/auth/login');
        })
        .catch(next);
    // .catch(err => next(err));    // Both syntaxes work
};

exports.showLogin = (req, res) => {
    res.render('auth/login');
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    authService.login(email, password)
        .then(token => {
            console.log('user logged');
            res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(next);
};

exports.logout = (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/auth/login');
};

// exports.get('/secret-action',
//     isAuthorized,
//     (req, res) => {
//         // do something
//         res.send('I am authorized');
//     });