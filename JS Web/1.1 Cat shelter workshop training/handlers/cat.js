import fs from 'fs';
import path from 'path';
import url from 'url';
// import cats from '../data/cats.json' assert { type: 'json' };;
// import breeds from '../data/breeds.json';
import { handleError, writeData } from '../utils.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res) => {
    const pathname = req.url;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let homeViewFilePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(homeViewFilePath, 'utf8', (err, data) => {

            if (err) handleError(err);

            writeData(res, data, 'text/html');
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let homeViewFilePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        fs.readFile(homeViewFilePath, 'utf8', (err, data) => {

            if (err) handleError(err);

            writeData(res, data, 'text/html');
        });
    } else {
        return true;
    }
}