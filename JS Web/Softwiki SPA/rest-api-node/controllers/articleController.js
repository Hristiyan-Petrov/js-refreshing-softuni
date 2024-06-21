const articleService = require('../services/articleService');
const Article = require('../models/Article');

const router = require('express').Router();

router.get('/', (req, res) => {

    articleService.getAll()
        .then(articles => {
            console.log(articles);
            res.json(articles);
        })
        .catch(err => {
            console.log(err);
            //TODO
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.post('/', (req, res) => {

    articleService.create(req.body)
        .then(article => res.json(article))
        .catch(err => {
            console.log(err);
            //TODO
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.get('/:articleId', (req, res) => {

    articleService.getOneById(req.params.articleId)
        .then(article => res.json(article))
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });


});

module.exports = router;