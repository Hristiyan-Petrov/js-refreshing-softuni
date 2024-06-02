import url from 'url';
import fs from 'fs';
// import { readFile } from 'node:fs';
import path from 'path';
// import cats from '../data/cats.json';

// __dirname is a build in varianble in NodeJS. However, it is not defined with Node.js native ESM support.
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Req is a readable stream
// Res is a writeable stream
export default (req, res) => {
    const pathname = req.url;

    if (pathname === '/' && req.method === 'GET') {

        let homeViewFilePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(homeViewFilePath,'utf8', (err, data) => {

            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Contetn-Type': 'text/plain'
                });

                res.write('Not found!')
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.write(data);
            res.end();
        });

        // Analogue using read stream, chunks, events

        // let src = fs.createReadStream(homeViewFilePath);
        // src.on('data', chunk => res.write(chunk));
        // src.on('end', () => res.end());


    } else {
        // If the url is not part of this module (home.js handler) return to the index js looping through other handlers
        return true;
    }
}