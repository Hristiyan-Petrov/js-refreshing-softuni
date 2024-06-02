import fs from 'fs';
import { handleError, writeData } from '../utils.js';

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html'
    } else if (url.endsWith('png')) {
        return 'image/png'
    } else if (url.endsWith('js')) {
        return 'text/javascript'
    } else if (url.endsWith('ico')) {
        return 'image/vnd.microsoft.icon'
    } else if (url.endsWith('jpg') || url.endsWith('jpeg')) {
        return 'image/jpeg'
    }
}

// // Browser sends requests for all static files (styles, images, etc.) included in project (index.html)
// export default (req, res) => {
//     // const pathname = req.url;

//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     if (pathname.startsWith('/content') && req.method === 'GET') {

//         fs.readFile(`${pathname}`, 'utf8', (err, data) => {
//             if (err) handleError(err);

//             console.log(`Static file pathname: ${pathname}`);

//             writeData(res, data, getContentType(pathname));
//         });

//     } else {
//         return true;
//     }
// }


export default (req, res) => {
    const pathname = req.url;

    if (pathname.startsWith('/content') && req.method === 'GET') {

        fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
            if (err) handleError(res, err);

            console.log(`Static file pathname: ${pathname}`);

            writeData(res, data, getContentType(pathname));
        })

    } else {
        return true;
    }
}