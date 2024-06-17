import { Router } from 'express';
import authService from '../services/authService.js';
import config from '../config/config.js';

// Route Guards
import isAuthenticated from '../middlewares/isAuthenticated.js';     // Not logged user cannot go to route with this middleware
import isGuest from '../middlewares/isGuest.js';

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('loginPage');
});

router.post('/login', isGuest, async (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase();

    try {
        let token = await authService.login({ username, password });

        res.cookie(config.development.JWT_COOKIE_NAME, token, {  // Good practice to be some abstact name (for security)
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            httpOnly: true
        });
        res.redirect('/cubes');

    } catch (error) {
        console.log(error);
        res.render('loginPage', { error })
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('registerPage');
});

router.post('/register', isGuest, async (req, res) => {
    // When async func, always use try catch

    let { username, password, repeatPassword } = req.body;
    username = username.toLowerCase();

    try {
        let user = await authService.register({ username, password, repeatPassword });
        res.redirect('/auth/login');

    } catch (error) {
        console.log(error);
        res.render('registerPage', { error });
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(config.development.JWT_COOKIE_NAME);
    res.redirect('/cubes');
});

export default router;