const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {

    // TODO check if username/email is taken

    // Hash password

    let user = new User(req.body);  // Good to be taken out in service

    user.save()     // Or User.create...
        .then(createdUser => {
            console.log(user);
            res.status(201).json({ _id: createdUser._id });
        })
        .catch(err => {
            // console.log(err);
            next({ status: 404, message: 'No such user or password.' });
        });
});

router.post('/login', (req, res, next) => {
    // TODO: Check if user exist
    // Check if pass is correct

    User.findOne({ username: req.body.login, password: req.body.password })
        .then(user => {
            console.log(user);

            // Generate jwt

            const token = jwt.sign(
                {
                    _id: user._id,
                    username: user.username,
                },
                'SUPERSECRET',      // Take out in config file
                { expiresIn: '1h' }
            );

            res.status(200).json({
                _id: user._id,
                username: user.username,
                token
            });
        })
        .catch(err => {
            next(err);
            console.log(err);
        });
});

module.exports = router;