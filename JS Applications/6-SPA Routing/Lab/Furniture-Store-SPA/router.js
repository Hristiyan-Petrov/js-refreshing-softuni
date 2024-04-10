// Set up the route on the inital app load to be '/furniture/all'
window.onload = function () {
    if (location.pathname === '/index.html') {
        history.pushState({}, '', '/furniture/all');
        // location.replace('/furniture/all');
        router();
    }
}

async function router() {
    let route = window.location.pathname;
    const dbUrl = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture/';
    const app = document.getElementById('container');

    const routes = {
        '/furniture/all': await getTemplateAll('allFurniture', dbUrl),
        '/furniture/create': await getTemplateCreate('createFurniture'),
    }

    console.log(route);

    let containerHtml = null;

    if (route.startsWith('/furniture/details')) {
        let furnitureId = route.split('/').pop(); // get the last part of the path as id
        let html = await getTemplateDetail('furnitureItemDetails', dbUrl, furnitureId);
        containerHtml = html;
    } else {
        containerHtml = routes[route];
    }
    
    app.innerHTML = routes[route] || '<h1>Page not found</h1>';
}

function getTemplateCreate(templateLocation) {
    return fetch(`${templateLocation}.hbs`)
        .then(res => res.text())
        .catch(err => {
            console.log(err.message);
        });
}

function getTemplateDetail(templateLocation, dbUrl, id) {
    // Handle furniture item details route

    return Promise.all([
        fetch(`${templateLocation}.hbs`),
        fetch(dbUrl + id + '.json')
    ])
        .then(([templateRes, furnitureRes]) => {
            return Promise.all([templateRes.text(), furnitureRes.json()]);
        })
        .then(([template, furnitureItemData]) => {
            console.log(template);
            console.log(furnitureItemData);

            let createHtml = Handlebars.compile(template);
            // Return the html to render 
            return createHtml(furnitureItemData);
        })
        .catch(err => {
            console.log(err.message);
        })
}

function getTemplateAll(templateLocation, dbUrl) {
    // Handle get all route

    return Promise.all([
        fetch(`${templateLocation}.hbs`),
        fetch(dbUrl + '.json')
    ])
        .then(([templateRes, furnitureRes]) => {
            return Promise.all([templateRes.text(), furnitureRes.json()]);
        })
        .then(([template, furnitureData]) => {
            // Iterating over furnitureData object keys to generate a new array with id properties to be used in the template 
            let dataWithId = Object.keys(furnitureData).map(key => ({
                id: key,
                ...furnitureData[key]
            }));

            // Pass the new array to Handlebars
            let createHtml = Handlebars.compile(template);
            // Return the html to render 
            return createHtml({ furniture: dataWithId });
        })
        .catch(err => {
            console.log(err.message);
        })
}

window.addEventListener('popstate', router);

document.body.addEventListener('click', function (e) {
    // If anchor is clicked
    if (e.target.tagName === 'A') {
        e.preventDefault();
        history.pushState(null, '', e.target.href);
        router();
    }
});