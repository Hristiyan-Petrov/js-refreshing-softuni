const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);