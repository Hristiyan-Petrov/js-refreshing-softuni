import { Router } from 'express';
const router = Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

export default router;