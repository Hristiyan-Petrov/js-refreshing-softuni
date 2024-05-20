import { html, render } from 'lit-html';

// import { html, render } from '../node_modules/lit-html/lit-html.js'; // Without webpack

import layout from '../views/layout.js';
import home from '../views/home.js';    // home is function
import login from '../views/login.js';  // login is function
import notFound from '../views/notFound.js';

const routes = [
    {
        path: '/',
        temlpate: home // home is function
    },
    {
        path: '/login',
        temlpate: login // login is function
    },
    {
        path: '/not-found',
        temlpate: notFound
    }
];

// Change url and render view
export const router = (path) => {
    history.pushState({}, '', path);    // Change the state

    let route = routes.find(x => x.path === path) || routes.find(x => x.path === '/not-found'); // Route is an object from routes

    render(layout(route.temlpate, { navigationHandler }), document.getElementById('app')); // Not hard, just follow the arg pass flow. Functional programming
};

// For maximum loose coupling this hanlder should be taken out of this file (Dependency resolving)
// For now it will stay because it is passing data to layout template. Will change the functionality later

// On anchor tag click event - to prevent reloading
function navigationHandler(e) {
    if (!e.target.tagName === 'A') {
        return;
    }

    e.preventDefault();

    console.log(e.target);
    
    let url = new URL(e.target.href);
    console.log(url);    
    
    router(url.pathname, { navigationHandler });    // Pass event handler as 'props' to layout, so header can access it
}