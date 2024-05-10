const routes = { // Mapping object, dictionary
    'login': 'login-form-template', // Id of Handlebars template
    'register': 'register-form-template',
    '/': 'home-template'

}

// Router is responsible for rendering views on specific path / Adjuster, traffic cop, regulirovchik
const router = path => {
    const mainElement = document.getElementById('main');

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML); // Creates function which returns HTML

    mainElement.innerHTML = template();
};

const navigate = path => {
    history.pushState({}, '', path); // Change route / url
    router(path); // Activate router to change view
}