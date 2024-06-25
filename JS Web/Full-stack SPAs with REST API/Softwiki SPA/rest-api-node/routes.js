const router = require('express').Router();

const articleController = require('./controllers/articleController');
const authController = require('./controllers/authController');
const { auth, isAuth } = require('./middlewares/auth');

router.use('/articles', isAuth, articleController);
router.use('/auth', authController);

module.exports = router;