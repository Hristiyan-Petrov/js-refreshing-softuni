const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, errors } = require('../config');

const register = async (email, password, rePassword, description) => {
    // if (password !== rePassword) return Promise.reject(errors.PASSWORDS_DO_NOT_MATCH);    // throw Equivalents return Promise.reject

    return User.create({
        email,
        password,
        description
    });
};

const login = async (email, password) => {
    let user = await User.findOne({ email });

    if (!user) throw (errors.INVALID_USER_OR_PASSWORD);

    let match = await bcrypt.compare(password, user.password);

    if (!match) throw (errors.INVALID_USER_OR_PASSWORD);

    let token = jwt.sign(
        { _id: user._id, email: user.email },
        SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

module.exports = {
    register,
    login
}