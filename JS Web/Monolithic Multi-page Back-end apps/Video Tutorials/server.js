const express = require('express');
const { PORT } = require('./config');
const routes = require('./routes');
const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

