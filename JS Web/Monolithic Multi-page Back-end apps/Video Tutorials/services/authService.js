const User = require('../models/User');

const register = (username, password) => {
    return User.create({
        username,
        password
    });
};

module.exports = {
    register
}