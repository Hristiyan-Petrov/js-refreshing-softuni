const express = require('express');
const { PORT } = require('./config');
const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

