const router = require('express').Router();

// const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const saveLastRoute = require('./middlewares/saveLastRoute');

router.use('/', require('./controllers/homeController'));
router.use('/auth', saveLastRoute, authController);
router.use('/ads', require('./controllers/adController'));

module.exports = router;