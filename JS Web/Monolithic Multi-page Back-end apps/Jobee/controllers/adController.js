const router = require('express').Router();
const adService = require('../services/adService');

router.get('/', (req, res) => {
    res.render('ads/all-ads');
});

router.get('/create', (req, res) => {
    res.render('ads/create');
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