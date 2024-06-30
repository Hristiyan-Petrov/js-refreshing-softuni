const adService = require('../services/adService');

exports.getAll = (req, res, next) => {
    adService.getAll(req.user?._id)
        .then(ads => {
            res.render('ads/all-ads', { ads });
        })
        .catch(next);
};

exports.getApplied = (req, res, next) => {
    adService.getUserData(req.user._id, 'appliedToAds')
        .then(doc => {
            res.render('ads/applied', { ads: doc.appliedToAds });
        })
        .catch(next);
};

exports.getOwn = (req, res, next) => {
    adService.getUserData(req.user._id, 'myAds')
        .then(doc => {
            res.render('ads/my-ads', { ads: doc.myAds });
        })
        .catch(next);
};

exports.showCreateForm = (req, res) => {
    res.render('ads/create');
};

exports.create = (req, res, next) => {
    adService.create(req.body, req.user._id)
        .then(newAd => {
            return adService.updateOwns(req.user._id, newAd._id);
        })
        .then(updated => {
            res.redirect(`/ads/user/${req.user._id}/my-ads`);
        })
        .catch(next);
};

exports.showSearchForm = (req, res) => {
    res.render('ads/search');
};

// Details page
exports.showAdDetails = async (req, res, next) => {
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
};

exports.applyToAd = (req, res, next) => {
    adService.applyUser(req.params.adId, req.user._id)
        .then(() => {
            res.redirect(`/ads/${req.params.adId}`);
        })
        .catch(next);
};

exports.showEditForm = (req, res, next) => {
    adService.getOneById(req.params.adId)
        .then(adData => res.render('ads/edit', adData))
        .catch(next)
};

exports.update = (req, res, next) => {
    adService.update(req.params.adId, req.body)
        .then(updated => res.redirect(`/ads/${req.params.adId}`))
        .catch(next);
};

exports.delete = (req, res, next) => {
    adService.delete(req.params.adId)
        .then(() => res.redirect(`/ads/user/${req.user._id}/my-ads`))
        .catch(next);
};