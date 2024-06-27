const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET,errors } = require('../config');

const register = (username, password, rePassword) => {

    if (password !== rePassword) return Promise.reject(errors.PASSWORDS_DO_NOT_MATCH);    // throw Equivalents return Promise.reject

    return User.create({
        username,
        password,
        rePassword
    });
};

const login = async (username, password) => {
    let user = await User.findOne({ username })

    if (!user) throw (errors.INVALID_USER_OR_PASSWORD);

    let match = await bcrypt.compare(password, user.password);

    if (!match) throw (errors.INVALID_USER_OR_PASSWORD);

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