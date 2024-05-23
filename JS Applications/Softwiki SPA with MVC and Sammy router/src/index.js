import { homePage } from "./controllers/catalog.js";
import { loginPage, postLogin, postRegister, registerPage } from "./controllers/user.js";
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

    this.post('/register', (ctx) => { postRegister(ctx); });    // This is needed because Sammy is old and cannot handle async/await funcs which return promises. Fix this problem by passing anonymous func to invoke 'postRegister' and won't return anything.
    this.post('/login', (ctx) => { postLogin(ctx); });

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