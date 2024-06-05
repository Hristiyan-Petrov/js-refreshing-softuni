// THIS IS THE MAIN ROUTER
// The app is using MODULAR ROUTER
// It allows using separation of concerns espacially for the routes. The architecture is like nested routers.
// There is one main Router which checks the beggining of each route and delegate it to corresponfing controller

import { Router } from 'express';

import productController from './controllers/productController.js'; 
import aboutController from './controllers/aboutController.js'; 

const router = Router();

// If route starts with '/products', it is delegated to productController. Like nested routers.
// router.use('/products', productController);     // See valuable examples in the controller in comments. They refer to the case when it is '/products'
router.use('/', productController);     // Cannot change '/' to 'products' because of assignment. But logic is the same
router.use('/about', aboutController);

export default router;