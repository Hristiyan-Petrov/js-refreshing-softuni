const Movie = require('../models/Movie');
const { isAuth } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    Movie.find()
        .then(movies => {
            res.json(movies);
        })
        .catch(err => {
            console.log(err);
        })

});

router.post('/', isAuth, (req, res) => {
    const movie = new Movie(req.body);

    movie.save()
        .then(createdMovie => {
            res.status(201).json({
                _id: createdMovie._id
            });
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;