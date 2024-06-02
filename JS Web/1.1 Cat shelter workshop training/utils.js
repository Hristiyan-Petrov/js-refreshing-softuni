import fs from 'fs';
import breeds from './data/breeds.json' with { type: 'json' };

export function handleError(err) {
    console.log(err);
    res.writeHead(404, {
        'Contetn-Type': 'text/plain'
    });

    res.write('Not found!')
    res.end();
    return;
};

export function writeData(res, data, contentType) {
    res.writeHead(200, {
        'Content-Type': `${contentType}`
    });

    res.write(data); // Load all data at once. not using stream
    res.end();
}

function getContentType(url) {

    // Check if static file
    if (url.startsWith('/content')) {
        url = url.replace('./', '');
    }

    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('png')) {
        return 'image/png';
    } else if (url.endsWith('js')) {
        return 'text/javascript';
    } else if (url.endsWith('ico')) {
        return 'image/vnd.microsoft.icon';
    } else if (url.endsWith('jpg') || url.endsWith('jpeg')) {
        return 'image/jpeg';
    } else {
        return 'text/html';
    }
}

export function handleGetReq(res, viewPath) {

    fs.readFile(viewPath, 'utf8', (err, data) => {
        if (err) handleError(err);

        if (viewPath.includes('addCat.html')) {
            data = data.replace('{{catBreeds}}', catBreedsPlaceholder());
        }

        writeData(res, data, getContentType(viewPath));
    });
}

const catBreedsPlaceholder = () => breeds.map(b => `<option value="${b}">${b}</option>`);