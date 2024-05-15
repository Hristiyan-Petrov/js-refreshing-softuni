// Execute this file only once on initial load

(function addEventListeners() {
    // Register partials
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    let movieCardTemplate = Handlebars.compile(document.getElementById('movie-card-partial-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('movie-card-partial-template', movieCardTemplate);

    // Initial app load
    navigate('home');
})();

function navigateHandler(e) {
    e.preventDefault();

    // if (!e.target.classList.contains('nav-link')) { // Contains is key word for Nodelist API (In this case DOMTokenList); little different from .tagName attr
    if (e.target.tagName !== 'A') {
        return;
    }

    let url = new URL(e.target.href); // Skip string operations
    navigate(url.pathname.slice(1));
}

function onLoginSubmit(e) {
    e.preventDefault();

    let loginFormData = new FormData(document.forms['login-form']); // Get form by its id from doucment property 'forms'

    let email = loginFormData.get('email'); // Get by name attr from HTML input element
    let password = loginFormData.get('password');

    authService.login(email, password)
        .then(data => {
            navigate('home');
        });
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let registerFormData = new FormData(document.forms['register-form']); // Get form by its id from doucment property 'forms'

    let email = registerFormData.get('email'); // Get by name attr from HTML input element
    let password = registerFormData.get('password');
    let rePassword = registerFormData.get('password');

    if (password !== rePassword) {
        console.log('Passwords should match!');
        return;
    }

    authService.register(email, password)
        .then(data => {
            navigate('home');
        });
}

function onAddMovieSubmit(e) {
    e.preventDefault();

    let addMovieFormData = new FormData(document.forms['add-movie-form']); // Get form by its id from doucment property 'forms'

    let title = addMovieFormData.get('title'); // Get by name attr from HTML input element
    let description = addMovieFormData.get('description');
    let imageUrl = addMovieFormData.get('imageUrl');

    movieService.add({
        title,
        description,
        imageUrl,
        creator: authService.getUserId(),
    })
        .then(res => {
            navigate('home');
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteMovie(e) {
    e.preventDefault();
    let id = e.target.dataset.id;

    movieService.deleteMovie(id)
        .then(() => {
            navigate('home');
        })
        .catch(err => {
            console.log(err);
        });
}

function onEditMovieSubmit(e, movieKey) {
    e.preventDefault(e);

    // let id = location.pathname.split('/').pop();

    let editMovieFormData = new FormData(document.forms['edit-movie-form']);
    let title = editMovieFormData.get('title');
    let description = editMovieFormData.get('description');
    let imageUrl = editMovieFormData.get('imageUrl');

    movieService.editMovie(movieKey, {
        title,
        description,
        imageUrl
    })
        .then(res => {
            navigate(`details/${movieKey}`);
        })
        .catch(err => {
            console.log(err);
        });
}

function likeMovie(e, movieId) {
    e.preventDefault();

    movieService.likeMovie(movieId)
        .then(res => {
            navigate(`details/${movieId}`);
        })
}