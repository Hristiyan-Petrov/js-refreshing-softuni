// THIS IS THE MAIN ROUTER
// The app is using MODULAR ROUTER
// It allows using separation of concerns espacially for the routes. The architecture is like nested routers.
// There is one main Router which checks the beggining of each route and delegate it to corresponding controller

import { Router } from 'express';

// Route Guards
import isAuthenticated from './middlewares/isAuthenticated.js';     // Not logged user cannot go to route with this middleware
import isGuest from './middlewares/isGuest.js';

import cubeController from './controllers/cubeController.js';
import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import accessoryController from './controllers/accessoryController.js';

const router = Router();

// If route starts with '/', it is delegated to homeController. Like nested routers.
// If there is no match in homeController routes, the cheking countinues to next router IN LINE. If there is a MATCH, the execution STOPS.
router.use('/', homeController);

router.use('/auth', isGuest, authController);

// If route starts with '/cubes', it is delegated to cubeController. Like nested routers.
router.use('/cubes', cubeController);    // See valuable examples in the controller in comments. They refer to the case when it is '/cubes'

router.use('/accessories', accessoryController);


// If the website's route doesn't match any of the routes
router.get('*', (req, res) => {
    res.status(404).render('404');
})

export default router;