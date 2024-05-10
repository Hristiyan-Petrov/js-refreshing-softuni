const routes = { // Mapping object, dictionary
    'login': 'login-form-template' // Id of Handlebars template
}


// Router is responsible for rendering views on specific path / Adjuster, traffic cop, regulirovchik
const router = path => {
    const mainElement = document.getElementById('main');

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML); // Creates function which returns HTML

    mainElement.innerHTML = template();
};

(function addEvenetListeners() {
    document.querySelector('.navigation').addEventListener('click', naviagateHandler);

})();

function naviagateHandler(e) {
    e.preventDefault();

    if (!e.target.classList.contains('nav-link')) { // Contains is key word for Nodelist API (In this case DOMTokenList); little different from .tagName attr
        return;
    }

    let url = new URL(e.target.href); // Skip string operations
    history.pushState({}, '', url.pathname); // Change route / url

    router(url.pathname.slice(1));
}