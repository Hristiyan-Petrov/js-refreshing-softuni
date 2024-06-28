const mongoose = require('mongoose');
const messages = require('../config').mongooseValidationMessages.ad;

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: [true, messages.REQUIRED + 'headline'],
        minlength: [4, 'Headline' + messages.MINLENGTH]
    },
    location: {
        type: String,
        required: [true, messages.REQUIRED + 'location'],
        minlength: [8, 'Location' + messages.MINLENGTH]
    },
    companyName: {
        type: String,
        required: [true, messages.REQUIRED + 'company'],
        minlength: [3, 'Company name' + messages.MINLENGTH]
    },
    companyDescription: {
        type: String,
        required: [true, messages.REQUIRED + 'company description'],
        minlength: [40, 'Company description' + messages.MINLENGTH]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    appliedUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Ad', adSchema);