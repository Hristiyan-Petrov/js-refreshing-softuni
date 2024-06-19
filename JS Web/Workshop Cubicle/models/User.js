import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from '../config/config.js';

const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        // validate: {
        //     validator: value => {
        //         return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
        //     },
        //     message: props => {
        //         return 'Use only English letters and digits';
        //     }
        // },
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        // validate: {
        //     validator: value => {
        //         return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
        //     },
        //     message: props => {
        //         return 'Use only English letters and digits';
        //     }
        // }
    }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(config.development.SALT_ROUNDS)
        .then(salt => {
            return bcrypt.hash(this.password, salt);
        })
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            // TODO
            console.log(err);
        });
});

const User = mongoose.model('User', userSchema);

// userSchema.path('username').validate({       // mongoose validation. If you want to use it, disable express-validator functionality
//     validator: async function (value) {
//         const existingUser = await User.findOne({ username: value });
//         return !existingUser;
//     },
//     message: 'username taken'
// });

export default User;