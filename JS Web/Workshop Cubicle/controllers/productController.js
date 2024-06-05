// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';
import productService from '../services/productService.js';
import { validateProduct } from './helpers/productHelpers.js';

const router = Router();

// If the whole route is: '/products' load this. It is like '/products/'
router.get('/', (req, res) => {
    res.render('home', { title: 'Cubicle', products: productService.getAll() });
});

// Route is '/products/create'
router.get('/create', (req, res) => {      
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', validateProduct, (req, res) => {     // Middlewares are passed in between params
    productService.create(req.body, (err) => {
        if (err) return res.status(500).send('Error at /create post');

        res.redirect('/products');
    });
});

// Last check
router.get('/details/:productId', (req, res) => {
    console.log(productService.getOne(req.params.productId));
    res.render('details', { title: 'Product details', product: productService.getOne(req.params.productId) });
});

export default router;