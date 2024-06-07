// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';
import cubeService from '../services/cubeService.js';
import accessoryService from '../services/accessoryService.js';
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

router.get('/details/:cubeId', (req, res) => {
    cubeService.getOneWithAccessories(req.params.cubeId)
        .then(cube => {
            const accessories = cube.accessories;
            res.render('details', { title: 'cube details', cube, accessories });
        })
        .catch(err => console.log(err));
});

router.get('/:cubeId/attach', async (req, res) => {

    let cube = await cubeService.getOne(req.params.cubeId);
    let notAttachedAccessories = await accessoryService.getAllNotAttached(cube.accessories);

    res.render('attachAccessory', { cube, notAttachedAccessories });
});

router.post('/:cubeId/attach', (req, res) => {
    let cubeId = req.params.cubeId;
    cubeService.attachAccessory(cubeId, req.body.accessory)
        .then(() => {
            res.redirect(`/cubes/details/${cubeId}`);
        })
        .catch(err => res.send(500, err));

});

export default router;