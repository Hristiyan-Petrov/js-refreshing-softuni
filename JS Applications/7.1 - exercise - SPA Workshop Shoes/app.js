import {
    auth,
    createUserWithEmailAndPassword
} from "./firebase-config.js"

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home

    this.get('/home', function (context) { // Get Sammy functions is used to render views; Post and others not 

        extendContext(context)
            .then(function () {
                this.partial('./templates/homeGuest.hbs'); // Sammy out of the box function for loading views, templates
            });

    });

    // User routes

    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs');
            });
    });

    this.post('/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (password !== rePassword) {
            console.log('passwords must match');
            return;
        }

        // Use Firebase Auth to create a user
        createUserWithEmailAndPassword(auth, email, password)
            .then(userData => {
                console.log(userData);
                // this.redirect('#/home');
            })
            .catch(err => {
                console.log(err);
            });

    });

    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
            });
    });

    // Offers routes
    this.get('/create-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createOffer.hbs');
            });

    });

    this.get('/edit-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/editOffer.hbs');
            });

    });

    this.get('/details', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/details.hbs');
            });

    });
});

(() => {
    app.run('/home'); // On initial app load, load this route
})();


// Function for loading partials
function extendContext(context) {
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    });
}