import fspromise from 'fs/promises';
import path from 'path';

export function handleError(res, err) {
    console.log(err);
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

export async function handleGetReq(res, viewPath, catId, searchString) {
    try {
        let data;

        // Check if the requested file is an image (do not use viewPaths)
        if (viewPath.endsWith('jpg') || viewPath.endsWith('jpgeg') || viewPath.endsWith('ico')) {
            data = await fspromise.readFile(viewPath);  // Read as binary

            // Requested file is a text file (html, css, js, etc.)
        } else {
            data = await fspromise.readFile(viewPath, 'utf8');

            // Loop through all view paths to find matching path and apply the relevant replacement
            for (let key in viewPaths) {
                if (viewPath.includes(key)) {
                    const template = viewPaths[key];
                    try {
                        const replacement = await template.fetch(key, catId, searchString); // passing key as template
                        data = data.replace('{{' + template.placeholder + '}}', replacement);
                    } catch (err) {
                        console.error(`Error fetching template for viewPath ${key}: ${err}`);
                    }
                    break;
                }
            }
        }

        writeData(res, data, getContentType(viewPath));

    } catch (err) {
        console.log(`Error on path: ${viewPath}`);
        handleError(res, err);
    }
}

// Used for more complex and scalable templating engine
const viewPaths = {
    'addCat.html': {
        placeholder: 'catBreeds',
        fetch: async (template) => {
            let breeds = await getJson('breeds');
            return placeholder('breeds', Array.isArray(breeds) ? breeds : [breeds]);
        }
    },
    'index.html': {
        placeholder: 'cats',
        fetch: async (template, cadId, searchString) => {
            let cats = await getJson('cats');
            if (searchString) {
                cats = cats.filter(cat =>
                    cat.name[0].toLowerCase().includes(searchString.toLowerCase()) ||
                    cat.description[0].toLowerCase().includes(searchString.toLowerCase()));
            }

            return placeholder('cats', cats);
        }
    },
    'catShelter.html': {
        placeholder: 'catShelter',
        fetch: async (template, catId) => {
            let cats = await getJson('cats');
            let currentCat = cats.find(cat => cat.id === Number(catId));
            if (!currentCat) {
                throw new Error(`Cat with id ${catId} not found.`);
            }
            return placeholder('catShelter', [currentCat]);
        }
    },
    'editCat.html': {
        placeholder: 'editCat',
        fetch: async (template, catId) => {
            let cats = await getJson('cats');
            let currentCat = cats.find(cat => cat.id === Number(catId));
            if (!currentCat) {
                throw new Error(`Cat with id ${catId} not found.`);
            }
            return placeholder('editCat', [currentCat]);
        }
    }
};

async function placeholder(type, data) {
    let templateFunc = templates[type];
    let breedOptionsHtml = await generateBreedOptions();
    return data.map(item => {
        let itemHtml = templateFunc(item);
        // Replace {{catBreeds}} placeholder with breedOptions 
        return itemHtml.replace('{{catBreeds}}', breedOptionsHtml);
    }).join('');
}

async function generateBreedOptions() {
    let breedsData = await getJson('breeds');
    return renderBreedOptions(Array.isArray(breedsData) ? breedsData : [breedsData]);
}

function renderTemplate(templateStr, data) {
    return templateStr.replace(/{{(.*?)}}/g, (_, varName) => data[varName]);
}

function renderBreedOptions(breedsData) {
    let templateFunc = templates['breeds'];
    return breedsData.map(breed => renderTemplate(templateFunc(breed), breed)).join('');
}

const templates = {
    'breeds': breed => `<option value="${breed}">${breed}</option>`,
    'cats': cat => `
        <li>
            <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.breed} cat">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}. Very cute tho.</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
            </ul>
        </li>`,
    'editCat': cat => `
        <form action="/cats-edit/${cat.id}" method="post" class="cat-form" enctype="multipart/form-data">
            <h2>Edit Cat</h2>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" value="${cat.name}">
            <label for="description">Description</label>
            <textarea id="description" name="description">${cat.description}</textarea>
            <label for="image">Image</label>
            <input type="file" id="image" name="upload">
            <label for="group">Breed</label>
            <select id="group" name="breed">
                {{catBreeds}}
            </select>
        <button type="submit">Edit Cat</button>
    </form>
    `,
    'catShelter': cat => `
        <form action="/cats-find-new-home/${cat.id}" method="post" class="cat-form">
        <h2>Shelter the cat</h2>
        <img src="${path.join('../content/images/' + cat.image)}" alt="${cat.breed} cat">
        <label for="name">Name</label>
        <input type="text" id="name" value="${cat.name}" disabled>
        <label for="description">Description</label>
        <textarea id="description" disabled>${cat.description}</textarea>
        <label for="group">Breed</label>
        <select id="group" disabled>
            {{catBreeds}}
        </select>
            <button type="submit">SHELTER THE CAT</button>
        </form>
    `
};

export const getJson = async (db) => JSON.parse(await fspromise.readFile(`./data/${db}.json`));