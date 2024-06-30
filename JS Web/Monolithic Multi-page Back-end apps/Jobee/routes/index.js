const router = require('express').Router();

const authRoutes = require('../routes/authRoutes');
const adRoutes = require('../routes/adRoutes');

router.use('/', require('../controllers/homeController'));
router.use('/auth', authRoutes);
router.use('/ads', adRoutes);

router.use('*', (req, res) => {
    res.status(404).render('error/404');
});

module.exports = router;