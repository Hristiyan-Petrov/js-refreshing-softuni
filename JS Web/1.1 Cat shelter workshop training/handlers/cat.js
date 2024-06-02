import fs from 'fs';
import path from 'path';
import url from 'url';
// import cats from '../data/cats.json' assert { type: 'json' };;
// import breeds from '../data/breeds.json' with { type: 'json' }; ;
import { handleGetReq } from '../utils.js';

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

    } else {
        return true;
    }
}