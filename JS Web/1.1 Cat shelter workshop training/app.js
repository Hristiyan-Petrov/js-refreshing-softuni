import { createServer } from 'http';
import handlers from './handlers/index.js';

const port = 5000;
const server = createServer();

server.on('request', (req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));