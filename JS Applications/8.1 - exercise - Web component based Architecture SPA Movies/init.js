// Using vaadin router; Docs: https://vaadin.github.io/router/vaadin-router/demo/#vaadin-router-getting-started-demos
// It solves the reloading when clicking (<a href> - links) out of the box
import { Router } from 'https://unpkg.com/@vaadin/router';

import { logout } from './services/authServices.js';

// Import components
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Notification from './components/notification.js';
import Movies from './components/movies.js';
import MovieCard from './components/movie-card.js';

// Register components
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('notification-component', Notification);
customElements.define('movies-component', Movies);
customElements.define('movie-card', MovieCard);

const rootElement = document.getElementById('root');
const router = new Router(rootElement);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    },
    {
        path: '/register',
        component: 'register-component'
    },
    {
        path: '/login',
        component: 'login-component'
    },
    {
        path: '/logout',
        action: () => {
            logout();
            // TO DO: redirect
        }
    },
]);
