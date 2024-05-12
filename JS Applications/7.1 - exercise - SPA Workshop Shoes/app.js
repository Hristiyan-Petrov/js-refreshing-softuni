const app = Sammy('#root', function () {

    this.use('Handlebars', '.hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home

    this.get('/home', function (context) { // Get Sammy functions is used to render views; Post and others not 
        this.partial('./templates/homeGuest.hbs'); // Sammy out of the box function for loading partials
    });

    // User routes

    this.get('/register', function (context) {
        this.partial('./templates/register.hbs');
    });

    this.get('/login', function (context) {
        this.partial('./templates/login.hbs');
    });

    // Offers routes
    this.get('/create-offer', function (context) {
        this.partial('./templates/createOffer.hbs');
    });

    this.get('/edit-offer', function (context) {
        this.partial('./templates/editOffer.hbs');
    });

    this.get('/details', function (context) {
        this.partial('./templates/details.hbs');
    });
});

(() => {
    app.run('/home'); // On initial app load, load this route
})();