const router = require('express').Router();
const adService = require('../services/adService');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');

router.get('/', (req, res, next) => {
    adService.getAds()
        .then(ads => {
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

router.get('/details/:adId', async (req, res, next) => {
    try {
        let ad = await adService.getOneById(req.params.adId);
        let authorEmail = (await adService.getAuthorEmail(ad.author)).email;

        res.render('ads/details', {
            ad,
            authorEmail,
            isOwn: ad.author == req.user._id,
            isApplied: ad.appliedUsers.some(x => x._id.equals(req.user._id))
        });

    } catch (error) {
        next(error)
    }
});

router.get('/apply/:adId', (req, res, next) => {
    console.log('req.user._id: ' + req.user._id);
    adService.applyUser(req.params.adId, req.user._id)
        .then(response => {
            console.log(response);
            res.redirect(`/ads/details/${req.params.adId}`);
        })
        .catch(err => next(err));
});

module.exports = router;