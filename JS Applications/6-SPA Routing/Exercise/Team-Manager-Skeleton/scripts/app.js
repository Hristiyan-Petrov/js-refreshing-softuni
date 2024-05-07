const router = Sammy('#main', function () { //#main is the root element in which the content will be rendered

    // Present template angine and file extension for Sammy to compile 
    this.use('Handlebars', 'hbs');

    // GET requests

    this.get('/home', function (context) { // Context comes from Sammy out of the box
        loadPartials(context)
            .then(function () {
                this.partial('../templates/home/home.hbs') // Load template
            });
    });

    this.get('/login', function (context) {
        loadPartials(context, {
            'loginForm': '../templates/login/loginForm.hbs'
        })
            .then(function () {
                this.partial('../templates/login/loginPage.hbs');
            });
    });

    this.get('/register', function (context) {
        loadPartials(context, {
            'registerForm': '../templates/register/registerForm.hbs'
        })
            .then(function () {
                this.partial('../templates/register/registerPage.hbs')
            });
    });

    this.get('/about', function (context) {
        loadPartials(context)
            .then(function () {
                this.partial('../templates/about/about.hbs')
            });
    });
});

// POST requests

(() => {
    router.run('/home'); // Load initial route on app start
})();

function loadPartials(context, extraPartials = {}) {
    const commonPartials = { // Register the partials used in the then template
        'header': '../templates/common/header.hbs', // key name must be the same as the partial name
        'footer': '../templates/common/footer.hbs'
    };

    let allPartials = Object.assign({}, commonPartials, extraPartials);
    return context.loadPartials(allPartials);
}