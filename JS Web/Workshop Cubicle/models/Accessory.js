import mongoose from 'mongoose';

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: [20, 'Description must be 50 characters or less']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?/, 'Please use a valid Image Url']
    }
});

export default mongoose.model('Accessory', accessorySchema);