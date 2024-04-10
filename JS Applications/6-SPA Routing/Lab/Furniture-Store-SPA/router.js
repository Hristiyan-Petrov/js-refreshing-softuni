window.onload = function () {
    if (location.pathname === '/index.html') {
        // location.replace('/furniture/all');
    }
}

console.log(Handlebars);

function router() {
    const app = document.getElementById('container');

    const routes = {
        '/furniture/create': null,
        '/furniture/all': null,
    }

    let route = window.location.pathname;
    console.log(route);

    app.innerHTML = routes[route] || '<h1>Page not found</h1>';

    switch (route) {
        case '/about':
            app.innerHTML = '<h1>About Page</h1>';
            break;
        case '/contact':
            app.innerHTML = '<h1>Contact Page</h1>';
            break;
        default:
            app.innerHTML = '<h1>Home Page</h1>';
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

// router();