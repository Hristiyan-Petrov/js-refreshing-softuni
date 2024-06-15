export default {
    development: {
        port: process.env.port || 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 10,
        SECRET_KEY: 'navuhodonosor'
    },
    production: {
        port: 80,
        DB_CONNECTION: 'insert mongodb atlas connection here',      // Create Atlas Cloud Mongo DB 
        SECRET_KEY: 'navuhodonosor'
    }
};