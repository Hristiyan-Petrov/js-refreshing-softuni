const express = require('express');
const cors = require('cors');
const mongooseConnector = require('./mongoose');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());    // Instead of body parser (HTML forms), use json parser for REST APIs
mongooseConnector(app);

app.use(auth);

app.get('/', (req, res) => {
    res.json({      // Express method for sending data in json format
        message: 'Sending json data'
    });
});

app.use('/api', routes);

// Impoertant to be after routes
app.use(errorHandler);      

app.listen(5000, console.log.bind(console, 'Server listening on port 5000...'));