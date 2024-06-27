const router = require('express').Router();
const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../config');
const isAuthorized = require('../middlewares/isAuthorized');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');
const attachFlashMessage = require('../middlewares/attachFlashMessage');

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

router.get('/register', attachFlashMessage, (req, res) => {
    res.render('auth/login');
});

router.post('/register',
    saveCurrentAuthViewLocals,
    (req, res, next) => {
        const { username, password, rePassword } = req.body;

        authService.register(username, password, rePassword)
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
        const { username, password } = req.body;

        authService.login(username, password)
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