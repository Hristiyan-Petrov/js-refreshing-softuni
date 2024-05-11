const routes = { // Mapping object, dictionary
    'home': 'home-template', // Id of Handlebars template
    'login': 'login-form-template',
    'register': 'register-form-template',
    'add-movie': 'add-movie-template',
}

// Router is responsible for rendering views on specific path / Adjuster, traffic cop, regulirovchik
const router = async path => {
    const mainElement = document.getElementById('main');

    // Initial templateData is authData = { isAuthenticated, email }
    let templateData = authService.getData();

    // Using this switch only for logout as there is no view to render
    switch (path) {
        case 'home':
            templateData.movies = await movieService.getAll();
            break;

        case 'logout':
            authService.logout();
            console.log('logged out');
            return navigate('home'); // Same as navigate being on previous line 

        default:
            break;
    }

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML); // Creates function which returns HTML

    mainElement.innerHTML = template(templateData); // Pass user data from session storage to template to use 
};

const navigate = path => {
    history.pushState({}, '', path); // Change route / url
    router(path); // Activate router to change view
}