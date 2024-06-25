const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home/index', { name: 'Hriskata' });
});

module.exports = router;