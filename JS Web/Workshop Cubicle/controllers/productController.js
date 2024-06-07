// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';
import productService from '../services/productService.js';
import { validateProduct } from './helpers/productHelpers.js';

const router = Router();

// If the whole route is: '/products' load this. It is like '/products/'
router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Cubicle', products });
        })
        .catch(err => res.status(500).end());
});

// Route is '/products/create'
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', validateProduct, (req, res) => {     // Middlewares are passed in between params
    // Old school way with callback

    // productService.create(req.body, (err) => {
    // if (err) return res.status(500).send('Error at /create post');
    // res.redirect('/products');
    // });

    productService.create(req.body)
        .then(() => { res.redirect('/products') })
        .catch(err => res.send(500, err));
});

// Last check
router.get('/details/:productId', (req, res) => {
    // console.log(productService.getOne(req.params.productId));
    

    productService.getOne(req.params.productId)
        .then(product => {
            res.render('details', { title: 'Product details', product });
        })
});

export default router;