const mongoose = require('mongoose');
const config = require('./index');

module.exports = (app) => {

    // Set up mongoose ODM (Object Document Mapping) library

    async function main() {
        await mongoose.connect(config.DB_CONNECTION);
    }

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));

    mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));

    main().catch(err => console.log(err));
}