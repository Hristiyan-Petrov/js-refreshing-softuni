import { html, render } from 'lit-html';

// import { html, render } from '../node_modules/lit-html/lit-html.js'; // Without webpack

import authService from './services/authService.js';
import articleService from './services/articleService.js';

import layout from './views/layout.js';
import home from './views/home.js';    // home is function
import login from './views/login.js';  // login is function
import register from './views/register.js';
import notFound from './views/notFound.js';
import createArticle from './views/create-article.js';
import articleDetails from './views/article-details.js';
import articleEdit from './views/article-edit.js';

import { onLoginSubmit, onLogout, onRegisterSubmit, onArticleCreateSubmit, onBackClick, onArticleEditSubmit, onDeleteClick } from './eventListeners.js';

const routes = [
    {
        path: /^\/$/i,    // path is: '/'
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
            onLoginSubmit
        },
        getData: articleService.getAll    // For rendering all articles from db on homepage
    },
    {
        path: /^\/login$/i,
        template: login, // login is function
        context: {
            onLoginSubmit
        }
    },
    {
        path: /^\/register$/i,
        template: register, // register is function
        context: {
            onRegisterSubmit
        }
    },
    {
        path: /^\/create$/i,
        template: createArticle,
        context: {
            onArticleCreateSubmit,
            onLoginSubmit
        }
    },
    {
        path: /^\/details\/(?<id>.+)$/i,     // For details/:id; get id later in 'param'
        template: articleDetails,
        getData: articleService.getOne,
        context: {
            onDeleteClick
        }
    },
    {
        path: /^\/edit\/(?<id>.+)$/i,     // For details/:id; get id later in 'param'
        template: articleEdit,
        getData: articleService.getOne,
        context: {
            onArticleEditSubmit
        }
    },
    {
        path: /^\/not-found$/i,
        template: notFound,
    }
];

// Change url and render view
export const router = (path) => {
    history.pushState({}, '', path);    // Change the state

    // Using RegEx because of details/id. Need a way to determine the path. All routers use regex underneath
    let route = routes.find(x => x.path.test(path)) || routes.find(x => x.path.test('/not-found')); // Route is an object from routes;    x.path is new RegEx obj
    let context = route.context;

    // Pass params to article details template // It is <id> from path: '/details/(?<id>\.+)',
    let params = route.path.exec(path).groups;

    let userData = authService.getData();

    if (route.getData) {    // For loading all articles on home
        switch (route.getData) {
            case articleService.getOne:
                route.getData(params.id)
                    .then(article => {
                        // Double render
                        render(layout(route.template, { navigationHandler, onLogout, onBackClick, ...userData, ...context, ...article, params }), document.getElementById('app'));
                    })

                break;

            case articleService.getAll:
                route.getData()
                    .then(articles => {
                        // Double render
                        render(layout(route.template, { navigationHandler, onLogout, ...userData, articles, ...context }), document.getElementById('app'));
                    })
                    .catch(err => {
                        console.log('err from client router getAllArticles: ' + err.message);
                        render(layout(route.template, { navigationHandler, ...userData, ...context }), document.getElementById('app'));
                    });
                break;

            default:
                break;
        }

    }

    render(layout(route.template, { navigationHandler, onLogout, ...userData, ...context, params }), document.getElementById('app')); // Not hard, just follow the arg pass flow. Functional programming
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

// Make browser back button to render
window.onpopstate = () => {
    router(location.pathname);
};