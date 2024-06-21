const router = require('express').Router();

const articleController = require('./controllers/articleController');
const authController = require('./controllers/authController');
const { auth } = require('./middlewares/auth');

router.use('/articles', auth, articleController);
router.use('/auth', authController);

module.exports = router;