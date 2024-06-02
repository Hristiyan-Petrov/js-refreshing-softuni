import { createServer } from 'http';
const port = 3000;

createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });

    res.write('Hello World! Nodemon is here!');
    res.end();
}).listen(port, () => console.log(`Server is listening on port ${port}`));