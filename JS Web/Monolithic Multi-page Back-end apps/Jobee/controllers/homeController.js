const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send('Hello World!');
    res.render('home/index', { username: 'Hriskata' });
});

module.exports = router;