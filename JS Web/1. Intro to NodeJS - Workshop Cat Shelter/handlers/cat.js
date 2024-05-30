const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
// const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = req.url;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {

         // Logic for showing the html view

         let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

         fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
        
                res.write('Error was found!');
                res.end();
                return;
            }
        
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

         fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
        
                res.write('Error was found!');
                res.end();
                return;
            }
        
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        } );
    } else {
        return true;
    }
}