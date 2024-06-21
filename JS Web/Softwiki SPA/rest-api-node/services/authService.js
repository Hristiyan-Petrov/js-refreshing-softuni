const bcrypt = require('bcrypt');
const config = require("../config");
const User = require("../models/User")
const jwt = require('jsonwebtoken');

const register = ({ email, password }) => {
    return bcrypt.hash(password, config.SALT_ROUNDS)
        .then(hash => {
            console.log('hash: ' + hash);
            console.log('before creation');
            return User.create({ email: email, password: hash });
        })
        .catch(err => {
            throw err;
        });
};

const login = ({ email }) => {
    return User.findOne({ email })
        .then(user => {
            const token = jwt.sign({ _id: user._id, email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });

            return {
                objectId: user._id,
                email: user.email,
                'user-token': token,
            };
        })
        .catch(err => { throw err });
};

module.exports = {
    register,
    login
};