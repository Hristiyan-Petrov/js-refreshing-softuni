import fs from 'fs';
import fspromise from 'fs/promises';
import path from 'path';
// import breeds from '../data/breeds.json' with { type: 'json' };
// import breeds from "../data/breeds.json";

export function handleError(res, err) {
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
        let data;

        // Check if the requested file is an image
        if (viewPath.endsWith('jpg') || viewPath.endsWith('jpgeg') || viewPath.endsWith('ico')) {
            data = await fspromise.readFile(viewPath);  // Read as binary
        // Requested file is a text file (html, css, js, etc.)
        } else {
            data = await fspromise.readFile(viewPath, 'utf8');  // Read as text (utf8 encoded)
            
            if (viewPath.includes('addCat.html')) {
                let breedsTemplate = await catBreedsPlaceholder();
                data = data.replace('{{catBreeds}}', breedsTemplate);
    
            } else if (viewPath.includes('index.html')) {
                let catsTemplate = await catsPlaceholder();
                data = data.replace('{{cats}}', catsTemplate)
            }
        }

        writeData(res, data, getContentType(viewPath));

    } catch (err) {
        console.log(`Error on path: ${viewPath}`);
        handleError(res, err);
    }
}

// const catBreedsPlaceholder = () => breeds.map(b => `<option value="${b}">${b}</option>`);

const catBreedsPlaceholder = async () => {
    const bufferData = await fspromise.readFile('./data/breeds.json');
    const breeds = JSON.parse(bufferData);
    return breeds.map(b => `<option value="${b}">${b}</option>`);
}

const catsPlaceholder = async () => {
    const bufferData = await fspromise.readFile('./data/cats.json');
    const cats = JSON.parse(bufferData);
    return cats.map(c => `
            <li>
                <img src="${path.join('./content/images/' + c.image)}" alt="${c.breed} cat">
                <h3>${c.name}</h3>
                <p><span>Breed: </span>${c.breed}</p>
                <p><span>Description: </span>${c.description}. Very cute tho.</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${c.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${c.id}">New Home</a></li>
                </ul>
            </li>
    `);
}