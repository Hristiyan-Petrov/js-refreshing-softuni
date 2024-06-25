const router = require('express').Router();
const authService = require('../services/authService');

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res, next) => {
    const { username, password } = req.body;

    authService.register(username, password)
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

router.post('/login', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

module.exports = router;