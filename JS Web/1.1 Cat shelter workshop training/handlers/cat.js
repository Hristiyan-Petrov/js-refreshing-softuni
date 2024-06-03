import qs from 'querystring';
import path from 'path';
import url from 'url';
import fs from 'fs';
// import formidable from 'formidable';
import { IncomingForm } from 'formidable';


// import cats from '../data/cats.json' assert { type: 'json' };;
import { handleError, handleGetReq, writeData } from './requester.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res) => {
    const pathname = req.url;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let viewPath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        handleGetReq(res, viewPath);
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let viewPath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        handleGetReq(res, viewPath);

    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {

        let formData = '';

        req.on('data', data => {
            // data is payload data from browser. comes when is html put form
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);  // Convert payload to assosiative array

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) handleError(err);

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let updatedBreeds = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', updatedBreeds, 'utf8', (err) => {
                    if (err) handleError(err);

                    console.log(`Sucessfully added cat breed ${body.breed}`);
                });
            });

            res.writeHead(302, { location: '/' });
            res.end();
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) handleError(err);
            
            let oldPath = files.upload[0].filepath;
            // let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload[0].originalFilename));

            let originalFilename = files.upload[0].originalFilename.replaceAll(' ', '-');   // Replace all spaces as they break the rules
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + originalFilename));

            fs.rename(oldPath, newPath, (err) => {
                if (err) handleError(err);
                console.log('Image file was uploaded successfully!');
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if (err) handleError(err);

                let allCats = JSON.parse(data);
                allCats.push({ id: allCats.length + 1, ...fields, image: originalFilename });
                let updatedCats = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', updatedCats, (err) => {
                    if (err) handleError(err);

                    res.writeHead(302, { location: '/' });
                    res.end();
                })
            });
        });

    } else {
        return true;
    }
}