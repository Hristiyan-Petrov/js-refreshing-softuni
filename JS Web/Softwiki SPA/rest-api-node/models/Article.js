const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [[''], 'Choose only from dropdown categories']
    },
    content: {
        type: String,
        required: true,
        maxlength: [50, 'Content must be no longer than 50 characters']
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Article', articleSchema);