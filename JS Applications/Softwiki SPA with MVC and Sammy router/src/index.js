import { homePage } from "./controllers/catalog.js";
import { loginPage, registerPage } from "./controllers/user.js";
import * as api from './data.js';

window.api = api;

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home
    this.get('/home', homePage);
    this.get('/', homePage);

    // User routes
    this.get('/register', registerPage);
    this.get('/login', loginPage);

    // Attach user data to 'App context'. 
    // Better practice than attaching to event context (previous logic in extendContext)
    // Available on all controllers
    // let user = getUserData(this);
    // this.userData = {
    //     isLoggedIn: Boolean(user),
    //     user
    // }
});

app.run(); // Initial app load

// (() => {
// app.run('/home'); // On initial app load, load this route
// })();