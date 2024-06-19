import { Router } from 'express';
import authService from '../services/authService.js';
import config from '../config/config.js';
import bcrypt from "bcrypt";

// Route Guards
import isAuthenticated from '../middlewares/isAuthenticated.js';     // Not logged user cannot go to route with this middleware
import isGuest from '../middlewares/isGuest.js';

import { body, validationResult } from 'express-validator';
import User from '../models/User.js';


const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('loginPage');
});

router.post('/login',
    isGuest,
    body('username')
        .toLowerCase(),     // Sanitizer
    body('password')    // Express-validation custom
        .custom(async (value, { req }) => {
            const existingUser = await User.findOne({ username: req.body.username });
            if (!existingUser) throw new Error('user not found');

            const isMatch = await bcrypt.compare(value, existingUser.password);
            if (!isMatch) throw new Error('wrong pass');
        }),
    async (req, res) => {

        const errors = validationResult(req).errors;
        try {
            if (errors.length > 0) throw errors;

            let { username, password } = req.body;
            let token = await authService.login({ username, password });

            res.cookie(config.development.JWT_COOKIE_NAME, token, {  // Good practice to be some abstact name (for security)
                expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
                httpOnly: true
            });
            res.redirect('/cubes');

        } catch (errors) {
            // console.log(error);
            res.render('loginPage', { errors })
        }
    });

router.get('/register', isGuest, (req, res) => {
    res.render('registerPage');
});

router.post('/register',
    isGuest,
    body('username')
        .isAlphanumeric().withMessage('use only English letters and digits')     // Express-validation built-in
        .isLength({ min: 5 }).withMessage('too short ')
        .custom(async value => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) throw new Error('username taken');
        })
        .toLowerCase(),     // Sanitizer
    body('password')
        .isAlphanumeric().withMessage('use only English letters and digits')
        .isLength({ min: 8 }).withMessage('too short'),
    body('repeatPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Passwords do not match');
            return true;
        }),
    async (req, res) => {
        // When async func, always use try catch

        const errors = validationResult(req).errors;     // using express-validator

        try {
            if (errors.length > 0) throw errors;

            const { username, password } = req.body;
            let user = await authService.register({ username, password });
            res.redirect('/auth/login');

        } catch (errors) {

            // express-validator
            res.render('registerPage', {
                usernameErrors: errors.filter(e => e.path === 'username'),
                passwordErrors: errors.filter(e => e.path === 'password'),
                repeatPasswordErrors: errors.filter(e => e.path === 'repeatPassword'),
            });

            // mongoose-validator
            // res.render('registerPage', {
            //     usernameErrors: errors.errors?.username ? [{ msg: errors.errors.username.message }] : null,
            //     passwordErrors: errors.errors?.password ? [{ msg: errors.errors.password.message }] : null,
            // });
        }
    });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(config.development.JWT_COOKIE_NAME);
    res.redirect('/cubes');
});

export default router;