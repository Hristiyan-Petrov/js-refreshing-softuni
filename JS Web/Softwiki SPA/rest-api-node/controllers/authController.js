const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const authService = require('../services/authService');

router.post('/register',
    body('email')
        .isEmail().withMessage('Email is not valid')
        .custom(async value => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) throw new Error('Email is already in use. Please provide new one.');
        })
        .normalizeEmail(),     // Sanitizer,
    body('password')
        .isStrongPassword().withMessage('Password must include one small and big letter, number and a symbol.'),
    body('rePassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords are not matching.');
        }),
    (req, res) => {
        const errors = validationResult(req).errors;

        try {
            if (errors.length > 0) throw errors;

            const { email, password } = req.body;

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

router.post('/login',
    body('email')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail()
        .custom(async (value, { req }) => {
            let existingUser = await User.findOne({ email: value });
            let match = await bcrypt.compare(req.body.password, existingUser?.password);
            if (!existingUser || !match) throw new Error('Incorrect email or password.');
        }),
    async (req, res) => {
        const errors = validationResult(req).errors;

        console.log('logging...');
        try {
            if (errors.length > 0) throw errors;

            // authService.login(req.body)

            User.findOne({ email: req.body.email })
                .then(user => {
                    const token = jwt.sign({ _id: user._id, username: user.username }, config.SECRET_KEY, { expiresIn: '1h' });

                    res.status(200).json({
                        objectId: user._id,
                        email: user.email,
                        'user-token': token,
                    });

                    console.log('logged from api');
                })
                .catch(err => { throw err });


        } catch (error) {
            console.log(error);
            res.status(err.status || 400).json({ error });
            // TODO: Maybe redirect to error page if code is 500?
        }
    });


module.exports = router;