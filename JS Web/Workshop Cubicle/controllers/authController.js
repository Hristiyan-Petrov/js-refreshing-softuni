import { Router } from 'express';
import authService from '../services/authService.js';
const router = Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    username = username.toLowerCase();

    try {
        let token = await authService.login({ username, password });

        res.cookie('USER_SESSION', token);  // Good practice to be some abstact name (for security)
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

    const { username, password, repeatPassword } = req.body;
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