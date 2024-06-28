const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');
const adService = require('../services/adService');

const router = require('express').Router();

router.get('/', (req, res, next) => {
    adService.getAll(3)
        .then(ads => {
            console.log(ads.length);
            res.render('home/index', { ads });
        })
        .catch(next)
});

module.exports = router;