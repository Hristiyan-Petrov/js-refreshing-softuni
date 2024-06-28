const mongoose = require('mongoose');
const messages = require('../config').mongooseValidationMessages.ad;

const getRequiredMessage = field => `${messages.REQUIRED}${field}`;
const getMinLengthMessage = field => `${field.charAt(0).toUpperCase() + field.slice(1)}${messages.MINLENGTH}`;

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: [true, getRequiredMessage('headline')],
        minlength: [4, getMinLengthMessage('Headline')]
    },
    location: {
        type: String,
        required: [true, getRequiredMessage('location')],
        minlength: [8, getMinLengthMessage('Location')]
    },
    companyName: {
        type: String,
        required: [true, getRequiredMessage('company')],
        minlength: [3, getMinLengthMessage('Company name')]
    },
    companyDescription: {
        type: String,
        required: [true, getRequiredMessage('company description')],
        minlength: [40, getMinLengthMessage('Company description')]
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

// Capitalize first letters
adSchema.pre('save', function (next) {
    this.headline = this.headline.charAt(0).toUpperCase() + this.headline.slice(1);
    this.location = this.location.charAt(0).toUpperCase() + this.location.slice(1);
    this.companyName = this.companyName.charAt(0).toUpperCase() + this.companyName.slice(1);
    this.companyDescription = this.companyDescription.charAt(0).toUpperCase() + this.companyDescription.slice(1);
    next();
});

module.exports = mongoose.model('Ad', adSchema);