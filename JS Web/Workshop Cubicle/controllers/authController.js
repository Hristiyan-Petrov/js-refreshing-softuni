import { Router } from 'express';
import authService from '../services/authService.js';
import config from '../config/config.js';
const router = Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    username = username.toLowerCase();

    try {
        let token = await authService.login({ username, password });

        res.cookie(config.development.JWT_COOKIE_NAME, token);  // Good practice to be some abstact name (for security)
        res.redirect('/cubes');

    } catch (error) {
        console.log(error);
        res.render('loginPage', { error })
    }
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register', async (req, res) => {
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

export default router;