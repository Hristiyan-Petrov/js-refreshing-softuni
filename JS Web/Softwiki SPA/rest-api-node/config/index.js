const config = {
    development: {
        port: process.env.port || 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 10,
        SECRET_KEY: 'navuhodonosor',
    },
    production: {
        port: 80,
        DB_CONNECTION: 'insert for example mongodb atlas connection',      // Create Atlas Cloud Mongo DB 
        SECRET_KEY: 'navuhodonosor',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];