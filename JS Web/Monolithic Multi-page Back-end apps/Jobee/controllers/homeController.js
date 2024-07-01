const adService = require('../services/adService');

const router = require('express').Router();

router.get('/', (req, res, next) => {
    adService.getLast3()
        .then(ads => {
            res.render('home/index', { ads });
        })
        .catch(next)
});

module.exports = router;