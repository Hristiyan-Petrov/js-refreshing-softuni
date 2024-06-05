import { Router } from 'express';
const router = Router();

// If the whole route is: '/products' load this. It is like '/products/'
router.get('/', (req, res) => {
    res.render('home');
});

// Route is '/products/create'
router.get('/create', (req, res) => {
    res.render('create');
});

export default router;