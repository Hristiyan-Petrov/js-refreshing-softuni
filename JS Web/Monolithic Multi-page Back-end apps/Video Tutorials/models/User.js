const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true
    },
    rePassword: {
        type: String,
        validate: {
            validator: value => {
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    }
});

module.exports = mongoose.model('User', userSchema);