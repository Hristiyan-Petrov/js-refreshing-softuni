const router = require('express').Router();
const adService = require('../services/adService');
const saveCurrentAuthViewLocals = require('../middlewares/saveCurrentAuthViewLocals');

router.get('/', (req, res, next) => {
    adService.get(req.user?._id)
        .then(ads => {
            res.render('ads/all-ads', { ads });
        })
        .catch(next);
});

router.get('/user/:userId/applied', (req, res, next) => {
    adService.getApplied(req.user._id)
        .then(doc => {
            console.log(doc);
            res.render('ads/applied', { ads: doc.appliedToAds });
        })
        .catch(next);
});

router.get('/user/:userId/my-ads', (req, res, next) => {
    adService.getOwn(req.user._id)
        .then(doc => {
            // console.log(doc.myAds);
            res.render('ads/my-ads', { ads: doc.myAds });
        })
        .catch(next);
});

router.get('/new', (req, res) => {
    res.render('ads/create');
});

router.post('/create', saveCurrentAuthViewLocals, (req, res, next) => {
    adService.create(req.body, req.user._id)
        .then(newAd => {
            return adService.updateOwns(req.user._id, newAd._id);
        })
        .then(updated => {
            res.redirect(`/ads/user/${req.user._id}/my-ads`);
        })
        .catch(next);
});

router.get('/search', (req, res) => {
    res.render('ads/search');
});

// Details page
router.get('/:adId', async (req, res, next) => {
    try {
        let ad = await adService.getOneById(req.params.adId);
        let params = { ad };

        if (req.user) {
            let authorEmail = (await adService.getAuthorEmail(ad.author)).email;
            Object.assign(params, {
                authorEmail,
                isOwn: ad.author == req.user?._id,
                isApplied: ad.appliedUsers?.some(x => x._id.equals(req.user._id))
            });
        }
        res.render('ads/details', params);

    } catch (error) {
        next(error);
    }
});

router.get('/:adId/apply', (req, res, next) => {
    adService.applyUser(req.params.adId, req.user._id)
        .then(() => {
            res.redirect(`/ads/${req.params.adId}`);
        })
        .catch(next);
});

router.get('/:adId/edit', (req, res, next) => {
    adService.getOneById(req.params.adId)
        .then(adData => res.render('ads/edit', adData))
        .catch(next)
});

router.post('/:adId/edit', saveCurrentAuthViewLocals, (req, res, next) => {
    adService.update(req.params.adId, req.body)
        .then(updated => res.redirect(`/ads/${req.params.adId}`))
        .catch(next);
});

router.get('/:adId/delete', (req, res, next) => {
    adService.delete(req.params.adId)
        .then(() => res.redirect(`/ads/user/${req.user._id}/my-ads`))
        .catch(next);
});

module.exports = router;