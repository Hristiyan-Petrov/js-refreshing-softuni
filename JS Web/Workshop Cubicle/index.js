import express from 'express';
import config from './config/config.js';  // Import named export
import setupExpress from './config/express.js';
import router from './routes.js';

const env = process.env.NODE_ENV || 'development';
const appConfig = config[env];
const app = express();

setupExpress(app);

app.use(router);

app.listen(appConfig.port, () => {
    console.log(`Server is listening on port ${appConfig.port}...`);
});
