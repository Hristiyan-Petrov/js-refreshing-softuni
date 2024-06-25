const User = require('../models/User');

const register = (username, password, rePassword) => {
    return User.create({
        username,
        password,
        rePassword
    });
};

const login = (username, password) => {

};

module.exports = {
    register,
    login
}