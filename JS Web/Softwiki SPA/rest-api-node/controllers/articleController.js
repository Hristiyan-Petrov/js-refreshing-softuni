const articleService = require('../services/articleService');
const { body, validationResult } = require('express-validator');

const router = require('express').Router();

router.get('/', (req, res) => {

    articleService.getAll()
        .then(articles => {
            res.json(articles);
        })
        .catch(err => {
            console.log(err);
            //TODO
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.post('/',
    body('title').not().isEmpty().withMessage('Please enter title'),
    body('content').isLength({ max: 150 }).withMessage('Content must be shorter'),
    (req, res) => {
        const errors = validationResult(req).errors;

        try {
            if (errors.length > 0) throw errors;

            articleService.create(req.body, req.user._id)
                .then(article => res.json(article))
                .catch(err => {
                    console.log(err);
                    //TODO
                    res.status(err.status || 500).json({ message: err.message });
                });
        } catch (error) {
            console.log('from create article controller:');
            console.log(errors);

            let titleErrors = errors.filter(e => e.path === 'title').map(e => ({ message: e.msg }));
            let contentErrors = errors.filter(e => e.path === 'content').map(e => ({ message: e.msg }));

            res.status(400).json({ titleErrors, contentErrors });
        }
    });

router.get('/:articleId', (req, res) => {
    articleService.getOneById(req.params.articleId)
        .then(article => {
            console.log('article' + article);
            res.json(article)
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });
});

router.put('/:articleId',
    body('title').not().isEmpty().withMessage('Please enter title'),
    body('content').isLength({ max: 150 }).withMessage('Content must be shorter'),
    (req, res) => {
        const errors = validationResult(req).errors;

        try {
            if (errors.length > 0) throw errors;

            articleService.edit(req.params.articleId, req.body)
                .then(article => res.json(article))
                .catch(err => {
                    console.log(err);
                    res.status(err.status || 400).json({ message: err.message });
                });

        } catch (errors) {
            console.log('from edit article controller:');
            console.log(errors);

            let titleErrors = errors.filter(e => e.path === 'title').map(e => ({ message: e.msg }));
            let contentErrors = errors.filter(e => e.path === 'content').map(e => ({ message: e.msg }));

            res.status(400).json({ titleErrors, contentErrors });
        }
    });

router.delete('/:articleId', (req, res) => {
    articleService.deleteOne(req.params.articleId)
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({ message: err.message });
        });
});

module.exports = router;