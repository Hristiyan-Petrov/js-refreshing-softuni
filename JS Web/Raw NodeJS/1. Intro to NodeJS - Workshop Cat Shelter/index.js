// const url = require('url');
// const fs = require('fs');
// const path = require('path');
const http = require('http');
const handlers = require('./handlers');
const port = 3000;

http.createServer((req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/plain'
    // });

    // res.write('Hello World! JS Web!');
    // res.end();

    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(port, () => console.log(`Server is listening on port ${port}...`));