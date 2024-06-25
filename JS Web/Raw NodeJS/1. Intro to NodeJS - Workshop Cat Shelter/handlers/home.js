const url = require('url');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {
    // const pathname = url.parse((req.url).pathname);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname === '/' || pathname === '/search' && req.method === 'GET') {

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
            let catsToShow = cats;

            // If search filter is applied should filter the cats
            if (pathname === '/search') {
                const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
                const searchString = parsedUrl.searchParams.get('searchString');
                catsToShow = catsToShow.filter(c => Array.isArray(c.name)   // Do this beacause of different test cat format saving
                    ? c.name[0].toLowerCase().includes(searchString.toLowerCase())  
                    : c.name.toLowerCase().includes(searchString.toLowerCase()))
            }

            let catsHtml = catsToShow.map(cat => `<li>
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
            modifiedData = modifiedData.replace('{{id}}', currentCat.id);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);

            let catBreedsHtml = breeds.map(breed => breed === currentCat.breed
                ? `<option selected value="${breed}">${breed}</option>`
                : `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedsHtml.join(''));

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(modifiedData);
            res.end();
        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/catShelter.html'));

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
            modifiedData = modifiedData.replace('{{id}}', currentCat.id);
            modifiedData = modifiedData.replace('{{description}}', currentCat.description);

            let catBreedsHtml = breeds.map(breed => breed === currentCat.breed
                ? `<option selected value="${breed}">${breed}</option>`
                : `<option value="${breed}">${breed}</option>`);
            modifiedData = modifiedData.replace('{{catBreeds}}', catBreedsHtml.join(''));

            modifiedData = modifiedData.replace('{{breed}}', currentCat.breed);
            modifiedData = modifiedData.replace('{{imageSrc}}', path.join('../content/images/' + currentCat.image));

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(modifiedData);
            res.end();
        });

    } else if (pathname.includes('/cats-edit/') && req.method === 'PATCH') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            // Image logic. Save locally at project
            let oldPath = files.upload[0].filepath;
            let originalFilename = files.upload[0].originalFilename.replaceAll(' ', '-');   // Replace all spaces as they break the rules
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + originalFilename));

            // Use rename() function to change the location on the uploaded file.
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('Image file was updated successfully!');
            });

            // Update current cat properties
            currentCat.name = fields.name;
            currentCat.description = fields.description;
            currentCat.breed = fields.breed;
            currentCat.image = originalFilename;

            fs.writeFile('./data/cats.json', JSON.stringify(cats), err => {
                if (err) throw err;

                // Use 302 code to be able to redirect
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });


    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {

        // Basically deleting cat (adopting it and remove from storage)
        let catId = pathname.slice(pathname.lastIndexOf('/') + 1);
        cats.splice(Number(catId) - 1, 1);

        fs.writeFile('./data/cats.json', JSON.stringify(cats), err => {
            if (err) throw err;

            // Use 302 code to be able to redirect
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });

    } else {
        // If we could not handle the current request,
        // we will notify the server of that by returning true 
        // (is request not handled - true)

        return true;
    }
}