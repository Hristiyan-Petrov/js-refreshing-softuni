// const env = process.env.NODE_ENV || 'development';

// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Server is listening on port ${config.port}...`));


import express from 'express';
import { config } from './config/config.js';  // Import named export
import setupExpress from './config/express.js';
import setupRoutes from './config/routes.js';

const env = process.env.NODE_ENV || 'development';
const appConfig = config[env];
const app = express();

setupExpress(app);
setupRoutes(app);

app.listen(appConfig.port, () => {
    console.log(`Server is listening on port ${appConfig.port}...`);
});
