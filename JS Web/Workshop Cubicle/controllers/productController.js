import { Router } from 'express';
const router = Router();

// If the whole route is: '/products' load this. It is like '/products/'
router.get('/', (req, res) => {
    res.render('home', {title: 'Cubicle'});
});

// Route is '/products/create'
router.get('/create', (req, res) => {
    res.render('create', {title: 'Create Cube'});
});

export default router;