// // import { readFile } from 'node:fs';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { handleGetReq } from './requester.js';
// // import cats from '../data/cats.json';

// // __dirname is a build in varianble in NodeJS. However, it is not defined with Node.js native ESM support.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // Req is a readable stream
// // Res is a writeable stream
export default (req, res) => {
    const pathname = req.url;

    if (pathname === '/' && req.method === 'GET') {

        let homeViewFilePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        handleGetReq(res, homeViewFilePath);


        // Analogue using read stream, chunks, events (useful if data was very large)

        // let src = fs.createReadStream(homeViewFilePath);
        // src.on('data', chunk => res.write(chunk));
        // src.on('error', err => handleError(err));
        // src.on('end', () => res.end());

    } else if (pathname.includes('/cats-edit') && req.method === 'GET') {

        let currentCatId = pathname.slice(pathname.lastIndexOf('/') + 1);

        let viewPath = path.normalize(path.join(__dirname, '../views/editCat.html'));

        handleGetReq(res, viewPath, currentCatId);

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {

        let currentCatId = pathname.slice(pathname.lastIndexOf('/') + 1);

        let viewPath = path.normalize(path.join(__dirname, '../views/catShelter.html'));

        handleGetReq(res, viewPath, currentCatId);

    } else if (pathname.includes('/cats-edit') && req.method === 'POST') {

    } else if (pathname === '/cats-edit' && req.method === 'POST') {

    } else {
        // If the url is not part of this module (home.js handler) return to the index js looping through other handlers
        return true;
    }
}
