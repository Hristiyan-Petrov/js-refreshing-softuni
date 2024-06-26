const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const register = (username, password, rePassword) => {

    if (password !== rePassword) return Promise.reject({ message: 'Passwords do not match', status: 400 });    // throw Equivalents return Promise.reject

    return User.create({
        username,
        password,
        rePassword
    });
};

const login = async (username, password) => {
    let user = await User.findOne({ username })

    if (!user) throw ({ message: 'Invalid user or password', status: 404 });

    let match = await bcrypt.compare(password, user.password);

    if (!match) throw ({ message: 'Invalid user or password', status: 404 });

    let token = jwt.sign(
        { _id: user._id, username: user.username },
        SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

module.exports = {
    register,
    login
}