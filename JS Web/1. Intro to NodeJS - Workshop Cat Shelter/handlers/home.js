const url = require('url');
const fs = require('fs');
const path = require('path');
// const cats = require('../data/cats.json');

module.exports = (req, res) => {
    // const pathname = url.parse((req.url).pathname);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname === '/' && req.method === 'GET') {

        // Logic for showing the home html view

        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {

            // In case of error

            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('File not found!');
                res.end();
                return;
            }

            // In case of success

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else {
        // If we could not handle the current request,
        // we will notify the server of that by returning true 
        // (is request not handled - true)

        return true;
    }
}