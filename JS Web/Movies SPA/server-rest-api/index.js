const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({      // Express method for sending data in json format
        message: 'Sending json data'
    });
});

app.listen(5000, console.log.bind(console, 'Server listening on port 5000...'));