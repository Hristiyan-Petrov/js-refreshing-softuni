const mongoose = require('mongoose');
const { DB_URI } = require('.');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(DB_URI);
}

mongoose.connection.on('connected', () => console.log(`MongoDB connected to ${DB_URI}`));

mongoose.connection.on('error', (err) => console.log('MongoDB connection error:', err));