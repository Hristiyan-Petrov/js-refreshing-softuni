const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['js', 'csharp', 'python', 'java'],
            message: 'Choose only from dropdown categories'
        }
    },
    content: {
        type: String,
        required: true,
        maxlength: [150, 'Content must be no longer than 50 characters']
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Article', articleSchema);