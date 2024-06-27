const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, mongooseValidationMessages } = require('../config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 5,
        validate:
            [
                // Check email format
                {
                    validator: function (value) {
                        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
                        return emailRegex.test(value);
                    },
                    message: 'Invalid email format. Expected format: <name>@<domain>.<extension>'
                },
                // Check if the email is already taken
                {
                    validator: async function (value) {
                        let currentUser = await User.findOne({ username: value });
                        console.log(currentUser);
                        return !currentUser;

                    }, 
                    message: mongooseValidationMessages.TAKEN_USERNAME
                }
            ]
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: function (value) {
                // At least 8 characters
                // Contains at least one digit
                // Contains at least one lowercase character
                // Contains at least one uppercase character
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

                return passwordRegex.test(value);
            },
            message: mongooseValidationMessages.STRONG_PASSWORD
        }
    },
    description: {
        type: String,
        required: true,
        minLength: 40
    }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next);
});

const User = mongoose.model('User', userSchema);

module.exports = User;