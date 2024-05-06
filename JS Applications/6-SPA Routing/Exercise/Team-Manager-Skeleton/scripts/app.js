const router = Sammy('#main', function () { //#main is the root element in which the content will be rendered

    this.use('Handlebars', 'hbs'); // Present and define template angine and file extension to Sammy 

    this.get('#/home', function () {
        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs'
        }).then(function () {
            this.partial('../templates/home/home.hbs')
        });
    });

    this.get('#/login', function () {
        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'login': '../templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('../templates/login/loginForm.hbs');
        });
    });
});

(() => {
    router.run('#/home'); // Load initial route on app start
})();