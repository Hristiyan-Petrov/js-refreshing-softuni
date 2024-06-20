const router = require('router');

const articleController = require('./controllers/articleController');

router.use('/articles', articleController);