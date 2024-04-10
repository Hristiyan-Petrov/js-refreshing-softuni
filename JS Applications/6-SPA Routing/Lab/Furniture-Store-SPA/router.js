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
        '/furniture/all': await getTemplate('allFurniture', dbUrl),
        '/furniture/create': await getTemplate('createFurniture'),
    }

    console.log(route);

    let containerHtml = null;

    if (route.startsWith('/furniture/details')) {
        let furnitureId = route.split('/').pop(); // get the last part of the path as id
        containerHtml = await getTemplate('furnitureItemDetails', dbUrl, furnitureId);
    } else {
        containerHtml = routes[route];
    }
    
    app.innerHTML = containerHtml || '<h1>Page not found</h1>';
}


function getTemplate(templateLocation, dbUrl, id = "") {
    return Promise.all([
        fetch(`${templateLocation}.hbs`),
        fetch(dbUrl + id + ".json")
    ])
        .then(([templateRes, dataRes]) => Promise.all([templateRes.text(), dataRes.json()]))
        .then(([template, data]) => {
            let templateData = data;

            if (templateLocation === 'allFurniture') {
                templateData = { 
                    furniture: Object.keys(data).map(key => ({ id: key, ...data[key] }))
                };
            }

            return Handlebars.compile(template)(templateData);
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