import { homePage } from './controllers/home.js'
import { loginPage, loginPost, logout, registerPage, registerPost } from "./controllers/user.js";
import { buyOffer, createOffer, createOfferPage, deleteOffer, detailsPage, editOfferPage, editOffer } from "./controllers/catalog.js";
import './firebase-config.js';
import { getUserData } from './helpers.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home
    this.get('/home', homePage);

    // Attach user data to 'App context'. 
    // Better practice than attaching to event context (previous logic in extendContext)
    // Available on all controllers
    let user = getUserData(this);
    this.userData = {
        isLoggedIn: Boolean(user),
        user
    }

    // User routes
    this.get('/register', registerPage);

    this.post('/register', registerPost);
    this.get('/login', loginPage);

    this.post('/login', loginPost);
    this.get('logout', logout);

    // Offers routes
    this.get('/details/:id', detailsPage);

    this.get('/create-offer', createOfferPage);
    this.post('/create-offer', createOffer);

    this.get('/edit-offer/:id', editOfferPage);
    this.post('/edit-offer/:id', editOffer);

    this.get('/buy/:id', buyOffer);

    this.get('/delete-offer/:id', deleteOffer);
});

app.run('/home'); // On initial app load, load this route

// (() => {
// app.run('/home'); // On initial app load, load this route
// })();