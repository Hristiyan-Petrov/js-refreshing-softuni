// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';
import productService from '../services/productService.js';

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

    // TO DO: Validate inputs!!!

    productService.create(req.body);

    res.redirect('/products');
});

// Last check
router.get('/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('details', { title: 'Product details' });
});

export default router;