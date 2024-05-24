import { createPage, createPost, detailsPage, homePage } from "./controllers/catalog.js";
import { loginPage, postLogin, postRegister, registerPage } from "./controllers/user.js";
import * as api from './data.js';
import { getUserData } from "./helpers.js";

window.api = api;

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Attach user data to 'App context'. 
    // Better practice than attaching to event context (previous logic in extendContext in other Shoes project)
    // Available on all controllers
    
    this.userData = getUserData();

    // Home
    this.get('/home', homePage);
    this.get('/', homePage);

    // User routes
    this.get('/register', registerPage);
    this.get('/login', loginPage);

    this.post('/register', (ctx) => { postRegister(ctx); });    // This is needed because Sammy is old and cannot handle async/await funcs which return promises. Fix this problem by passing anonymous func to invoke 'postRegister' and won't return anything.
    this.post('/login', (ctx) => { postLogin(ctx); });

    // Articles and DB routes
    this.get('/create', createPage);
    this.post('/create', (ctx) => { createPost(ctx); } );

    this.get('/details/:id', detailsPage);

    // this.get('/edit/:id', editPage);
    // this.post('/edit/:id', (ctx) => { editPost(ctx); } );

});

app.run(); // Initial app load