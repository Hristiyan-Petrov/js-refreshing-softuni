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
        // Handle get all furniture and display them
        let dbUrl = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json';
        let container = document.getElementById('container');

        return Promise.all([
            fetch(`${templateLocation}.hbs`),
            fetch(dbUrl)
        ])
            .then(([templateRes, furnitureRes]) => {
                return Promise.all([templateRes.text(), furnitureRes.json()]);
            })
            .then(([template, furnitureData]) => {
                console.log(template);
                console.log(furnitureData);

                let createHtml = Handlebars.compile(template);

                return createHtml({ furniture: furnitureData })
                // let furnitureHtml = createHtml({ furnitureData });
                // container.innerHTML = furnitureHtml;
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