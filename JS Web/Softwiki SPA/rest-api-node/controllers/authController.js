const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

router.post('/register',
    body('email')
        .isEmail().withMessage('Email is not valid')
        .custom(async value => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) throw new Error('Email is already in use. Please provide new one.');
        })
        .normalizeEmail(),     // Sanitizer,
    body('password')
        .isStrongPassword().withMessage('Password must include one small and big letter, number and a symbol'),
    body('rePassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords are not matching');
            return true;
        }),
    (req, res) => {
        const errors = validationResult(req).errors;

        try {
            if (errors.length > 0) throw errors;

            const { email, password } = req.body;
            console.log(email, password);
            // const username = email.slice(0, email.indexOf('@'));

            bcrypt.hash(password, config.SALT_ROUNDS)
                .then(hash => {
                    return User.create({ email: email, password: hash });
                })
                .then(createdUser => {
                    console.log(createdUser);
                    res.json(createdUser);
                })
                .catch(err => {
                    console.log('CATCH ERR');
                    console.log(err);
                    res.status(err.status || 500).json({ message: err.message });
                });

        } catch (errors) {


            let emailErrors = errors.filter(e => e.path === 'email').map(e => ({ message: e.msg }));
            let passwordErrors = errors.filter(e => e.path === 'password').map(e => ({ message: e.msg }));
            let repeatPasswordErrors = errors.filter(e => e.path === 'rep-pass').map(e => ({ message: e.msg }));

            console.log('errors');
            console.log(errors);

            res.status(400).json({ emailErrors, passwordErrors, repeatPasswordErrors });
        }
    });

module.exports = router;