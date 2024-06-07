// THIS IS THE MAIN ROUTER
// The app is using MODULAR ROUTER
// It allows using separation of concerns espacially for the routes. The architecture is like nested routers.
// There is one main Router which checks the beggining of each route and delegate it to corresponding controller

import { Router } from 'express';

import cubeController from './controllers/cubeController.js'; 
import homeController from './controllers/homeController.js'; 

const router = Router();

// If route starts with '/', it is delegated to homeController. Like nested routers.
// If there is no match in homeController routes, the cheking countinues to next router IN LINE. If there is a MATCH, the execution STOPS.
router.use('/', homeController);

// If route starts with '/cubes', it is delegated to cubeController. Like nested routers.
router.use('/cubes', cubeController);    // See valuable examples in the controller in comments. They refer to the case when it is '/cubes'


// If the website's route doesn't match any of the routes
router.get('*', (req, res) => {
    res.status(404).render('404');
})

export default router;