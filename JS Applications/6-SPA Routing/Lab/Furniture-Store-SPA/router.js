// Set up the route on the inital app load to be '/furniture/all'
window.onload = function () {
    if (location.pathname === '/index.html') {
        history.pushState({}, '', '/furniture/all');
        // location.replace('/furniture/all');
        router();
    }
}

async function router() {
    const app = document.getElementById('container');

    const routes = {
        '/furniture/all': await getTemplate('allFurniture', true),
        '/furniture/create': await getTemplate('createFurnitue'),
    }

    let route = window.location.pathname;
    console.log(route);

    app.innerHTML = routes[route] || '<h1>Page not found</h1>';
}

function getTemplate(templateLocation, getAll) {

    if (!getAll) {

        return fetch(`${templateLocation}.hbs`)
            .then(res => res.text())
            .catch(err => {
                console.log(err.message);
            });

    } else {
        // Handle get all route
        let dbUrl = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json';

        return Promise.all([
            fetch(`${templateLocation}.hbs`),
            fetch(dbUrl)
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