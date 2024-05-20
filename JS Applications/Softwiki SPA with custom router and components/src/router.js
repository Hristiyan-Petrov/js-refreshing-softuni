import { html, render } from 'lit-html';

// import { html, render } from '../node_modules/lit-html/lit-html.js'; // Without webpack

import authService from './services/authService.js';

import layout from './views/layout.js';
import home from './views/home.js';    // home is function
import login from './views/login.js';  // login is function
import register from './views/register.js';
import notFound from './views/notFound.js';
import createArticle from './views/create-article.js';

import { onLoginSubmit, onLogout, onRegisterSubmit, onArticleCreateSubmit } from './eventListeners.js';

const routes = [
    {
        path: '/',
        template: (props) => {

            let template = home;
            let path = '/';

            // If user is not logged in render and redirect to login page
            if (!props.isAuthenticated) {
                template = login;
                path = 'login';
            }

            history.pushState({}, '', path);
            
            return template(props);
        },
        context: {
            onLogout
        }
    },
    {
        path: '/login',
        template: login, // login is function
        context: {
            onLoginSubmit
        }
    },
    {
        path: '/register',
        template: register, // login is function
        context: {
            onRegisterSubmit
        }
    },
    {
        path: '/create',
        template: createArticle,
        context: {
            onArticleCreateSubmit
        }
    },
    {
        path: '/not-found',
        template: notFound
    }
];

// Change url and render view
export const router = (path) => {
    history.pushState({}, '', path);    // Change the state

    let route = routes.find(x => x.path === path) || routes.find(x => x.path === '/not-found'); // Route is an object from routes
    let context = route.context;

    let userData = authService.getData();

    render(layout(route.template, { navigationHandler, ...userData, ...context }), document.getElementById('app')); // Not hard, just follow the arg pass flow. Functional programming
};

// For maximum loose coupling this hanlder should be taken out of this file (Dependency resolving)
// For now it will stay because it is passing data to layout template. Will change the functionality later

// On anchor tag click event - to prevent reloading
function navigationHandler(e) {
    if (!e.target.tagName === 'A' || !e.target.attributes.getNamedItem('href')) {
        return;
    }

    e.preventDefault();

    console.log(e.target);

    let url = new URL(e.target.href);
    console.log(url);

    router(url.pathname, { navigationHandler });    // Pass event handler as 'props' to layout, so header can access it
}