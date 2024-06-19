const Movie = require('../models/Movie');

const router = require('express').Router();

router.post('/', (req, res) => {
    console.log(req.body);

    const movie = new Movie(req.body);

    movie.save()
        .then(createdMovie => {
            console.log(createdMovie);
            res.status(201).json({
                _id: createdMovie._id
            });
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;