const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongooseValidationMessages } = require('../config/constants');
const { SALT_ROUNDS } = require('../config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: async function (value) {
                let currentUser = await User.findOne({ username: value });
                console.log(currentUser);
                return !currentUser;

            }, message: mongooseValidationMessages.TAKEN_USERNAME
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch()
});

const User = mongoose.model('User', userSchema);

module.exports = User;