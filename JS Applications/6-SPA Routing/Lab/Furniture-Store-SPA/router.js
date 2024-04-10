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
        '/furniture/all': await getTemplate('./templates/allFurniture', dbUrl, "", true),
        '/furniture/create': await getTemplate('./templates/createFurniture')
    }

    console.log(route);

    let containerHtml = null;

    if (route.startsWith('/furniture/details')) {
        let furnitureId = route.split('/').pop(); // get the last part of the path as id
        containerHtml = await getTemplate('./templates/furnitureItemDetails', dbUrl, furnitureId, true);
    } else {
        containerHtml = routes[route];
    }

    app.innerHTML = containerHtml || '<h1>Page not found</h1>';
}

function getTemplate(templateLocation, dbUrl = "", id = "", fetchItem = false) {
    let fetches = [
        fetch(`${templateLocation}.hbs`)
    ];
    if (fetchItem) fetches.push(fetch(dbUrl + id + ".json"));

    return Promise.all(fetches)
        .then(responses => {
            let [templateRes, dataRes] = responses;
            return Promise.all([templateRes.text(), dataRes ? dataRes.json() : null]);
        })
        .then(([template, data]) => {
            let templateData = data;
            
            console.log(template);

            if (templateLocation === './templates/allFurniture') {
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