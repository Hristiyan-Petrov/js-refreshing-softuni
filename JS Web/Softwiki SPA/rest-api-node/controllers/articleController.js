const Article = require('../models/Article');

const router = require('express').Router();

router.get('/', (req, res) => {
    Article.find()
        .then(articles => {
            res.json(articles.map(x => {        // Convert mongo obj to js obj so the format matches the client curr implementation
                x = x.toObject();
                return { ...x, objectId: x._id };
            }));
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.post('/', (req, res) => {

    Article.create(req.body)
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.get('/:articleId', (req, res) => {
    Article.findById(req.params.articleId)
        .then(article => {

            // console.log({...article, objectId: article._id});

            // res.json({...article, objectId: article._id});

            res.json(article);

        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });
});

module.exports = router;