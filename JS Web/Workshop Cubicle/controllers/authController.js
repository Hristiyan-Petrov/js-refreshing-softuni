import { Router } from 'express';
import authService from '../services/authService.js';
const router = Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register', async (req, res) => {
    // When async func, always use try catch

    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('registerPage', { message: 'Passwords must match!' });
        return;
    }

    try {
        await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
    }
});

export default router;