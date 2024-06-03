import fs from 'fs';
import fspromise from 'fs/promises';
// import breeds from '../data/breeds.json' with { type: 'json' };
// import breeds from "../data/breeds.json";

export function handleError(err) {
    console.log(err.message);
    res.writeHead(404, {
        'Contetn-Type': 'text/plain'
    });

    res.write('Not found!')
    res.end();
    throw err;
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

export async function handleGetReq(res, viewPath) {
    try {
        let data = await fspromise.readFile(viewPath, 'utf8');

        if (viewPath.includes('addCat.html')) {
            let breedsTemplate = await catBreedsPlaceholder();
            data = data.replace('{{catBreeds}}', breedsTemplate);
        }

        writeData(res, data, getContentType(viewPath));
        
    } catch (err) {
        handleError(err);
    }
}

// const catBreedsPlaceholder = () => breeds.map(b => `<option value="${b}">${b}</option>`);

const catBreedsPlaceholder = async () => {
    const bufferData = await fspromise.readFile('./data/breeds.json');
    const breeds = JSON.parse(bufferData);
    return breeds.map(b => `<option value="${b}">${b}</option>`);
}