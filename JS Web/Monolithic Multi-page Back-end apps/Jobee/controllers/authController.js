const router = require('express').Router();
const authService = require('../services/authService');
const { AUTH_COOKIE_NAME, errors } = require('../config');
const isAuthorized = require('../middlewares/isAuthorized');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');
const attachFlashMessage = require('../middlewares/attachFlashMessage');

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

router.get('/register', attachFlashMessage, (req, res) => {
    res.render('auth/register');
});

router.post('/register',
    saveCurrentAuthViewLocals,
    (req, res, next) => {
        const { email, password, rePassword, description } = req.body;

        if (password !== rePassword) {
            req.flash('error', errors.PASSWORDS_DO_NOT_MATCH);
        }

        authService.register(email, password, rePassword, description)
            .then(createdUser => {
                console.log('createdUser: ' + createdUser);
                res.redirect('/auth/login');
            })
            .catch(next);
        // .catch(err => next(err));    // Both syntaxes work
    });

router.get('/login', attachFlashMessage, (req, res) => {
    res.render('auth/login');
});

router.post('/login',
    saveCurrentAuthViewLocals,
    (req, res, next) => {
        const { email, password } = req.body;

        authService.login(email, password)
            .then(token => {
                console.log('user logged');

                res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

                res.redirect('/');
            })
            .catch(next);
    });


router.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});


router.get('/secret-action',
    isAuthorized,
    (req, res) => {
        // do something
        res.send('I am authorized');
    });

module.exports = router;