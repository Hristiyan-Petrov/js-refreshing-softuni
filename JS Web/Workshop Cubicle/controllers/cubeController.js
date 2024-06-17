// Service is the place for business logic. Not for the controllers.
// Controllers should only handle requests, responses and validation (part from handling req) 

import { Router } from 'express';

// Route Guards
import isAuthenticated from '../middlewares/isAuthenticated.js';    // Not logged user cannot go to route with this middleware
import isGuest from '../middlewares/isGuest.js';

import cubeService from '../services/cubeService.js';
import accessoryService from '../services/accessoryService.js';
import { validateCube } from './helpers/cubeHelpers.js';

const router = Router();

// If the whole route is: '/cubes' load this. It is like '/cubes/'
router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            req.session.cubeIds = cubes.map(cube => cube._id);   // A session is a place to store data that you want access to across requests
            res.render('home', { title: 'Cubicle', cubes });
        })
        .catch(err => console.log(err));
});

router.get('/order', (req, res) => {
    if (!req.query.sortingAttribute || !req.query.sortingDirection) {
        res.render('home', { title: 'Cubicle', cubes: req.session.cubes || [] });
        return;
    }

    cubeService.order(req.session.cubeIds, req.query.sortingAttribute, req.query.sortingDirection)  // Use cubes stored in session
        .then(cubes => {
            res.render('home', { title: 'Cubicle', cubes });
        })
        .catch(err => console.log(err));
});

// Route is '/cubes/create'
router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', validateCube, isAuthenticated, (req, res) => {     // Middlewares are passed in between params
    // Old school way with callback
    // cubeService.create(req.body, (err) => {
    // if (err) return res.status(500).send('Error at /create post');
    // res.redirect('/cubes');
    // });

    cubeService.create(req.body, req.user._id)
        .then(() => { res.redirect('/cubes') })
        .catch(err => res.send(500, err));
});

router.get('/details/:cubeId', (req, res) => {
    cubeService.getOneWithAccessories(req.params.cubeId)
        .then(cube => {
            const accessories = cube.accessories;
            const isAuthorized = cube.creator == req.user._id;
            res.render('details', { title: 'Cube Details', cube, accessories, isAuthorized });
        })
        .catch(err => console.log(err));
});

router.get('/:cubeId/attach', isAuthenticated, async (req, res) => {

    let cube = await cubeService.getOne(req.params.cubeId);
    let notAttachedAccessories = await accessoryService.getAllNotAttached(cube.accessories);

    res.render('attachAccessory', { cube, notAttachedAccessories });
});

router.post('/:cubeId/attach', isAuthenticated, (req, res) => {
    let cubeId = req.params.cubeId;
    cubeService.attachAccessory(cubeId, req.body.accessory)
        .then(() => {
            res.redirect(`/cubes/details/${cubeId}`);
        })
        .catch(err => res.send(500, err));

});

router.get('/:cubeId/edit', isAuthenticated, (req, res) => {
    cubeService.getOne(req.params.cubeId)
        .then(cube => {
            if (cube.creator != req.user._id) return res.redirect('/cubes');

            res.render('editCube', { title: 'Edit Cube', cube });
        })
        .catch(err => console.log(err));
});

router.post('/:cubeId/edit', isAuthenticated, validateCube, (req, res) => {

    cubeService.getOne(req.params.cubeId)
        .then(cube => {
            if (cube.creator != req.user._id) return res.redirect('/cubes');
            return cubeService.editOne(req.params.cubeId, req.body);
        })
        .then(updatedCube => {
            res.redirect(`/cubes/details/${updatedCube._id}`);
        })
        .catch(err => console.log(err));
});

router.get('/:cubeId/delete', isAuthenticated, (req, res) => {
    cubeService.getOne(req.params.cubeId)
        .then(cube => {
            if (cube.creator != req.user._id) return res.redirect('/cubes');

            res.render('delete', { title: 'Delete cube', cube });
        })
        .catch(err => console.log(err));
});

router.post('/:cubeId/delete', isAuthenticated, (req, res) => {

    cubeService.getOne(req.params.cubeId)
        .then(cube => {
            if (cube.creator != req.user._id) return res.redirect('/cubes');

            return cubeService.deleteOne(req.params.cubeId);
        })
        .then(() => {
            res.redirect('/cubes');
        })
        .catch(err => console.log(err));
});

export default router;