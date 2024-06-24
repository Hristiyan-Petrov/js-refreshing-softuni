const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authService = require('../services/authService');

router.post('/register',
    body('email')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail()     // Sanitizer,
        .custom(async value => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) throw new Error('Email is already in use. Please provide new one.');
        }),
    body('password')
        .isStrongPassword().withMessage('Password must include one small and big letter, number and a symbol.'),
    body('rePassword')
        .optional().isString()
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords are not matching.');
            return true;
        }),
    (req, res) => {
        const errors = validationResult(req).errors;

        try {
            if (errors.length > 0) throw errors;

            authService.register(req.body)
                .then(user => {
                    console.log(user);
                    res.json(user);
                })
                .catch(err => {
                    res.status(err.status || 500).json({ message: err.message });
                });


        } catch (errors) {
            console.log(errors);

            let emailErrors = errors.filter(e => e.path === 'email').map(e => ({ message: e.msg }));
            let passwordErrors = errors.filter(e => e.path === 'password').map(e => ({ message: e.msg }));
            let repeatPasswordErrors = errors.filter(e => e.path === 'rep-pass').map(e => ({ message: e.msg }));

            console.log('errors');

            res.status(400).json({ emailErrors, passwordErrors, repeatPasswordErrors });
        }
    });

router.post('/login',
    body('email')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            let existingUser = await User.findOne({ email: value });
            let match = req.body.password ? await bcrypt.compare(req.body.password, existingUser?.password) : false;
            if (!existingUser || !match) throw new Error('Incorrect email or password.');
        }),
    (req, res) => {
        const errors = validationResult(req).errors;
        try {
            if (errors.length > 0) throw errors;

            authService.login(req.body)
                .then(userObject => {
                    res.status(200).json(userObject);
                    console.log('logged from api');
                })
                .catch(err => { throw err });
        } catch (error) {
            console.log(error);
            res.status(error.status || 400).json({ error });
            // TODO: Maybe redirect to error page if code is 500?
        }
    });

module.exports = router;