const router = require('express').Router();
const User = require('../models/User');

router.post('/register', (req, res) => {

    // check if user exists

    // register user

    console.log(req.body);

    let user = new User(req.body);  // Good to be taken out in service
    user.save()
        .then(createdUser => {
            console.log(user);
            res.status(201).json({ _id: createdUser._id });
        })

})

module.exports = router;