const router = require('express').Router();

const articleController = require('./controllers/articleController');

router.use('/articles', articleController);

module.exports = router;