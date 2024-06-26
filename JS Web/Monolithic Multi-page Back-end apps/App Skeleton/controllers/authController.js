const router = require('express').Router();
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');
const authService = require('../services/authService');

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
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

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login',
    saveCurrentAuthViewLocals,
    (req, res, next) => {
        const { username, password } = req.body;

        authService.login(username, password)
            .then(token => {
                console.log('user logged');

                res.cookie('token', token, { httpOnly: true });

                res.redirect('/');
            })
            .catch(next);
    });


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;