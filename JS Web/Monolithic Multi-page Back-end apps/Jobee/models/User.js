const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, mongooseValidationMessages: { auth: messages } } = require('../config');

const getRequiredMessage = field => `${messages.REQUIRED}${field}`;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, getRequiredMessage('email')],
        validate:
            [
                // Check email format
                {
                    validator: function (value) {
                        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
                        return emailRegex.test(value);
                    },
                    message: messages.INVALID_EMAIL_FORMAT
                },
                // Check if the email is already taken
                {
                    validator: async function (value) {
                        let currentUser = await User.findOne({ email: value });
                        return !currentUser;

                    },
                    message: messages.TAKEN_EMAIL
                }
            ]
    },
    password: {
        type: String,
        required: [true,getRequiredMessage('password')],
        validate: {
            validator: function (value) {
                // At least 8 characters
                // Contains at least one digit
                // Contains at least one lowercase character
                // Contains at least one uppercase character
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

                return passwordRegex.test(value);
            },
            message: messages.STRONG_PASSWORD
        }
    },
    description: {
        type: String,
        required: [true, getRequiredMessage('description')],
        minlength: [10, 'Description' + messages.MINLENGTH],
    },
    myAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ad'
        }
    ],
    appliedToAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ad'
        }
    ]
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