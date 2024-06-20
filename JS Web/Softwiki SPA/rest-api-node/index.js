const express = require('express');
const cors = require('cors');
const mongooseConnector = require('./config/mongoose');

const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());    // Instead of body parser (HTML forms), use json parser for REST APIs
mongooseConnector(app);

app.use('/api', routes);

app.listen(config.PORT, console.log.bind(console, `Server listening on port ${config.PORT}...`));