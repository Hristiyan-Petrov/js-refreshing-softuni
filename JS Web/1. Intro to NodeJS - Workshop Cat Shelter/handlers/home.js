const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

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

            let catsHtml = cats.map(cat => `<li>
            <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>Bombay Cat</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
            </ul>
        </li>`).join('');

            let modifiedData = data.toString().replace('{{cats}}', catsHtml);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(modifiedData);
            res.end();
        });

    } else if (pathname.includes('/cats-edit/') && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('File not found!');
                res.end();
                return;
            }

            let currentCatId = pathname.slice(pathname.lastIndexOf('/') + 1);
            let currentCat = cats.find(cat => cat.id === Number(currentCatId));
            
            let modifiedData = data.toString().replace('{{name}}', currentCat.name);
            // modifiedData.replace('{{name}}', currentCat.name);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);

            let catBreedsHtml = breeds.map(breed => breed === currentCat.breed 
                ? `<option selected value="${breed}">${breed}</option>` 
                : `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedsHtml.join(''));

            modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);

            // res.writeHead(200, {
            //     'Content-Type': 'text/html'
            // });

            res.write(modifiedData);
            res.end();
        });

    } else if (pathname.includes('/cats/find-new-home') && req.method === 'GET') {


    } else if (pathname.includes('/cats-edit/') && req.method === 'POST') {


    } else if (pathname.includes('/cats/find-new-home') && req.method === 'POST') {


    } else {
        // If we could not handle the current request,
        // we will notify the server of that by returning true 
        // (is request not handled - true)

        return true;
    }
}