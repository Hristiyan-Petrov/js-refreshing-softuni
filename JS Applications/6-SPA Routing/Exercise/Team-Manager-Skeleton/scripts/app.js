const router = Sammy('#main', function () { //#main is the root element in which the content will be rendered

    this.use('Handlebars', 'hbs'); // Present and define template angine and file extension to Sammy 

    this.get('#/home', function () {
        this.loadPartials({ // Register the partials used in the then template
            'header': '../templates/common/header.hbs', // key name must be the same as the partial name
            'footer': '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('../templates/home/home.hbs') // Laod template
        });
    });

    this.get('#/login', function () {
        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'loginForm': '../templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('../templates/login/loginPage.hbs');
        });
    });

    this.get('#/register', function() {
        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'registerForm': '../templates/register/registerForm.hbs'
        })
        .then(function() {
            this.partial('../templates/register/registerPage.hbs')
        })
    })
});

(() => {
    router.run('#/home'); // Load initial route on app start
})();