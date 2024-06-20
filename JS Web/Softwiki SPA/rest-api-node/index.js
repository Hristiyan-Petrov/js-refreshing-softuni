const express = require('express');
const cors = require('cors');
const mongooseConnector = require('./config/mongoose');

// const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());    // Instead of body parser (HTML forms), use json parser for REST APIs
mongooseConnector(app);

app.use('/api', routes);

app.listen(5000, console.log.bind(console, 'Server listening on port 5000...'));