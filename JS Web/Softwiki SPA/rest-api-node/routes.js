const router = require('express').Router();

const articleController = require('./controllers/articleController');
const authController = require('./controllers/authController');

router.use('/articles', articleController);
router.use('/auth', authController);

module.exports = router;