// // import { readFile } from 'node:fs';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { handleError, handleGetReq, getJson } from './requester.js';
import { IncomingForm } from 'formidable';

// // __dirname is a build in varianble in NodeJS. However, it is not defined with Node.js native ESM support.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // Req is a readable stream
// // Res is a writeable stream
export default async (req, res) => {
    const pathname = req.url;

    if (pathname === '/' || pathname.includes('/search') && req.method === 'GET') {

        let homeViewFilePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        if (pathname.includes('/search')) {
            const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
            const searchString = parsedUrl.searchParams.get('searchString');
            handleGetReq(res, homeViewFilePath, null, searchString);
            return;
        }

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

        let form = new IncomingForm({
            allowEmptyFiles: true,
            minFileSize: 0
        });

        form.parse(req, async (err, fields, files) => {
            if (err) handleError(res, err);

            let allCats = await getJson('cats');
            let catId = pathname.slice(pathname.lastIndexOf('/') + 1);
            let currentCat = allCats.find(cat => cat.id === Number(catId));

            let originalFilename;

            if (files.upload[0].size) {
                let oldPath = files.upload[0].filepath;
                originalFilename = files.upload[0].originalFilename.replaceAll(' ', '-');   // Replace all spaces as they break the rules
                let newPath = path.normalize(path.join(__dirname, '../content/images/' + originalFilename));

                // Use rename() function to change the location on the uploaded file.
                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log('Image file was updated successfully!');
                });
            }


            // Update current cat properties
            currentCat.name = fields.name;
            currentCat.description = fields.description;
            currentCat.breed = fields.breed;
            currentCat.image = originalFilename || currentCat.image;

            fs.writeFile('./data/cats.json', JSON.stringify(allCats), err => {
                if (err) handleError(res, err);

                // Use 302 code to be able to redirect
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });

        });

    } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
        // Delete cat (adopt it and remove from website)

        let allCats = await getJson('cats');
        let deleteCatId = Number(pathname.slice(pathname.lastIndexOf('/') + 1));
        allCats.splice(deleteCatId - 1, 1)   // Delete current cat
        allCats = allCats.map(c => c.id > deleteCatId ? ({...c, id: c.id - 1}) : c);

        fs.writeFile('./data/cats.json', JSON.stringify(allCats), err => {
            if (err) handleError(res, err);

            console.log('Cat adopted!');

            // Use 302 code to be able to redirect
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });


    } else {
        // If the url is not part of this module (home.js handler) return to the index js looping through other handlers
        return true;
    }
}
