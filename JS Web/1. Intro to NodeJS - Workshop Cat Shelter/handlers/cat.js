const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = req.url;

    // GET METHODS

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

            let catBreedsHtml = breeds.map(breed => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedsHtml);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(modifiedData);
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
        });

        // POST METHODS

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

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
                console.log('Image file was uploaded successfully!');
            });

            // Get all cats inside json.file, modify them and write them back
            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) throw err;

                let allCats = JSON.parse(data);
                allCats.push({ id: JSON.parse(data).length + 1, ...fields, image: originalFilename });
                let modifiedCats = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', modifiedCats, (err) => {
                    if (err) throw err;

                    // Use 302 code to be able to redirect
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                });
            });
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {

        // 1.	Parse the incoming data from the form
        let formData = '';

        // When new chunk is available for reading. Subscribe to 'data' event. PubSub, Event Emitter
        req.on('data', data => {
            formData += data;
        });

        // When no there is no more data available. Subscribe to 'end' event. PubSub, Event Emitter
        req.on('end', () => {
            let body = qs.parse(formData);

            // 2.	Read the breeds.json file
            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    console.log('Error has occured');
                    throw err;
                    // return res.end('Error reading breeds.json');
                }

                let breeds = JSON.parse(data);
                // 3.	Modify the breeds.json file
                breeds.push(body.breed);
                let updatedBreedsData = JSON.stringify(breeds);

                // 4.	Update the breeds.json file
                fs.writeFile('./data/breeds.json', updatedBreedsData, 'utf-8', (err) => {

                    if (err) {
                        console.log('Error writing breeds.json');
                        throw err;
                    }

                    // Clear the module cache for breeds.json
                    // delete require.cache[require.resolve('./data/breeds.json')];

                    // 5.	Redirect to the home page ('/') and end the response
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();

                    console.log('The breed was uploaded sucessfully');
                });
            });
        });

    } else {
        return true;
    }
}