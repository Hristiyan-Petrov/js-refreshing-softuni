// Set up the route on the inital app load to be '/furniture/all'
window.onload = function () {
    if (location.pathname === '/index.html') {
        // location.replace('/furniture/all');
        // router()
    }
}

async function router() {
    const app = document.getElementById('container');

    const routes = {
        '/furniture/all': await getTemplate('allFurniture'),
        '/furniture/create': null,
    }

    let route = window.location.pathname;
    console.log(route);

    console.log(routes[route]);

    app.innerHTML = routes[route] || '<h1>Page not found</h1>';


}

function getTemplate(templateLocation) {
    return fetch(`${templateLocation}.hbs`)
        .then(res => res.text())
        .catch(err => {
            console.log(err.message);
        });
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

// router();

// switch (route) {
//     // case '/furniture/all':
//     // app.innerHTML = '<h1>All furniture</h1>';
//     // break;
//     case '/about':
//         app.innerHTML = '<h1>About Page</h1>';
//         break;
//     case '/contact':
//         app.innerHTML = '<h1>Contact Page</h1>';
//         break;
//     default:
//         app.innerHTML = '<h1>Home Page</h1>';
// }