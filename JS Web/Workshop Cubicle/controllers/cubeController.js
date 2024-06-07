// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';
import cubeService from '../services/cubeService.js';
import { validateCube } from './helpers/cubeHelpers.js';

const router = Router();

// If the whole route is: '/cubes' load this. It is like '/cubes/'
router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            res.render('home', { title: 'Cubicle', cubes });
        })
        .catch(err => res.status(500).end());
});

// Route is '/cubes/create'
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', validateCube, (req, res) => {     // Middlewares are passed in between params
    // Old school way with callback
    // cubeService.create(req.body, (err) => {
    // if (err) return res.status(500).send('Error at /create post');
    // res.redirect('/cubes');
    // });

    cubeService.create(req.body)
        .then(() => { res.redirect('/cubes') })
        .catch(err => res.send(500, err));
});

// Last check
router.get('/details/:cubeId', (req, res) => {
    // console.log(cubeService.getOne(req.params.cubeId));
    

    cubeService.getOne(req.params.cubeId)
        .then(cube => {
            res.render('details', { title: 'cube details', cube });
        })
});

export default router;