const router = require('express').Router();

// const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const adController = require('./controllers/adController');

router.use('/', require('./controllers/homeController'));
router.use('/auth', authController);
router.use('/ads', adController);

module.exports = router;