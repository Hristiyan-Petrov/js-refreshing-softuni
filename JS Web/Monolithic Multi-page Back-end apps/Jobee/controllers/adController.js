const router = require('express').Router();
const adService = require('../services/adService');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');

router.get('/', (req, res, next) => {
    adService.getAll()
        .then(ads => {
            console.log(ads);
            res.render('ads/all-ads', { ads });
        })
        .catch(next);
});

router.get('/create', (req, res) => {
    res.render('ads/create');
});

router.post('/create', saveCurrentAuthViewLocals, (req, res, next) => {
    adService.create(req.body, req.user._id)
        .then(newAd => {
            return adService.updateOwns(req.user._id, newAd._id);
        })
        .then(updated => {
            res.redirect('/ads');
        })
        .catch(next);
});

router.get('/search', (req, res) => {
    res.render('ads/search');
});

router.get('/edit', (req, res) => {
    res.render('ads/edit');
});

router.get('/details', (req, res) => {
    res.render('ads/details');
})

module.exports = router;