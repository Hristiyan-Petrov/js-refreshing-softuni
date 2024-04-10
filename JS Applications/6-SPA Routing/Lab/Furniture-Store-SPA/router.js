function router() {

    const routes = {
        '/furniture/create': null,
        '/furniture/all': null,
    }

    let route = window.location.pathname;

    console.log(route);

    let app = document.getElementById('app');
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
    if (e.target.tagName === 'A') {
        e.preventDefault();
        history.pushState(null, '', e.target.href);
        router();
    }
});

router();