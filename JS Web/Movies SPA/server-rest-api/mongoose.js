const mongoose = require('mongoose');

module.exports = (app) => {

    // Set up mongoose ODM (Object Document Mapping) library

    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/movies-rest-api');
    }

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));

    mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));

    main().catch(err => console.log(err));
}