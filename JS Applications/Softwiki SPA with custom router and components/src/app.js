import '../styles/typography.css'; // Webpack usage
import '../styles/common.css';
import '../styles/form.css';
import '../styles/create.css';
import '../styles/home.css';
import '../styles/auth.css';
import '../styles/details.css';
import { html, render } from 'lit-html';

// import { html, render } from '../node_modules/lit-html/lit-html.js'; // Without webpack

import layout from '../views/layout.js';
import home from '../views/home.js';    // home is function
import login from '../views/login.js';  // login is function

const routes = [
    {
        path: '/',
        temlpate: home // home is function
    },
    {
        path: '/login',
        temlpate: login // login is function
    }
];

// Change url and render view
const router = (path) => {
    console.log(path);

    let route = routes.find(x => x.path === path); // Route is an object from routes

    render(layout(route.temlpate(), { navigationHandler }), document.getElementById('app')); // Not hard, just follow the arg pass flow. Functional programming
};

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

router(location.pathname); // Get the current route and invoke the func to load the corresponding view
