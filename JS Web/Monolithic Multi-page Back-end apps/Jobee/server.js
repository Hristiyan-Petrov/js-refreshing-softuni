const express = require('express');
const { PORT } = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`));

