import { Router } from 'express';
const router = Router();

// If the whole route is: '/products' load this. It is like '/products/'
router.get('/', (req, res) => {
    res.render('home', { title: 'Cubicle' });
});

// Route is '/products/create'
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', (req, res) => {
    console.log(req.body);
});

// Last check
router.get('/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('details', { title: 'Product details' });
});

export default router;