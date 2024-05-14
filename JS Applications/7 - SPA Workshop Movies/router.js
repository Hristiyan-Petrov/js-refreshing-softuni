const routes = { // Mapping object, dictionary
    'home': 'home-template', // Id of Handlebars template
    'login': 'login-form-template',
    'register': 'register-form-template',
    'add-movie': 'add-movie-template',
    'details': 'movie-details-template',
    // 'edit-movie': 'edit-movie-template'
}

// Router is responsible for rendering views on specific path / Adjuster, traffic cop, regulirovchik
const router = async fullPath => {
    let [path, movieKey, isEdit] = fullPath.split('/'); // id when click on details 
    console.log(path, movieKey);
    const mainElement = document.getElementById('main');

    let templateId = routes[path];
    let templateData = authService.getData(); // Initial templateData is authData = { isAuthenticated, email }
    let movieDetailsData = null; // Predefine so can be used in 2 cases if needed

    // Using this switch only for logout as there is no view to render
    switch (path) {
        case 'home':
            templateData.movies = await movieService.getAll();
            break;

        case 'logout':
            authService.logout();
            console.log('logged out');
            return navigate('home'); // Same as navigate being on previous line 

        case 'details':
            movieDetailsData = await movieService.getOne(movieKey);
            // let isCreator = movieDetailsData.creator === authService.getUserId();
            Object.assign(templateData, movieDetailsData, { movieKey });
            console.log(templateData);

            if (isEdit) {
                templateId = 'edit-movie-template';
            }

            break;

        // case 'edit-movie':
        //     movieDetailsData = await movieService.getOne(movieKey);
        //     Object.assign(templateData, movieDetailsData, { movieKey });
        //     console.log(templateData);
        //     break;

        default:
            break;
    }

    let template = Handlebars.compile(document.getElementById(templateId).innerHTML); // Creates function which returns HTML
    mainElement.innerHTML = template(templateData); // Pass user data from session storage to template to use 
};

const navigate = path => {
    history.pushState({}, '', path); // Change route / url
    router(path); // Activate router to change view
}