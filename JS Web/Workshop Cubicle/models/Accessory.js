import mongoose from 'mongoose';

const accessorySchema = new mongoose.Schema({
    name: {
        name: String,
        required: true,
    },
    description: {
        name: String,
        required: true,
        maxlength: [20, 'Description must be 50 characters or less']
    },
    imageUrl: {
        name: String,
        required: true,
        match: [/^https?/, 'Please use a valid Image Url']
    }
});

export default mongoose.model('Accessory', accessorySchema);