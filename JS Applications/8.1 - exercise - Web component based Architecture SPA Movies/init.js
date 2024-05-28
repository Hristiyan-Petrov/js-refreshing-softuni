// Using vaadin router; Docs: https://vaadin.github.io/router/vaadin-router/demo/#vaadin-router-getting-started-demos
// It solves the reloading when clicking (<a href> - links) out of the box
import { Router } from 'https://unpkg.com/@vaadin/router';

import { logout } from './services/authServices.js';
import { dispatchNotificationEvent } from '../services/notificationService.js';


// Import components
import Navigation from './components/navigation.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Notification from './components/notification.js';
import Movies from './components/movies.js';
import MovieCard from './components/movie-card.js';
import MovieDetails from './components/movie-details.js';
import CreateMovie from './components/create-movie.js';
import EditMovie from './components/edit-movie.js';

// Register components
customElements.define('navigation-component', Navigation);
customElements.define('footer-component', Footer);
customElements.define('notification-component', Notification);
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('movies-component', Movies);
customElements.define('movie-card', MovieCard);
customElements.define('movie-details-component', MovieDetails);
customElements.define('create-movie-component', CreateMovie);
customElements.define('edit-movie-component', EditMovie);



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
            // return commands.redirect('/');

            let homeComponent = document.querySelector('home-component');
            if (homeComponent) {
                dispatchNotificationEvent('Logged out!', 'success')
                homeComponent.connectedCallback();
            }
        },
        component: 'home-component'
    },
    {
        path: '/create',
        component: 'create-movie-component'
    },
    {
        path: '/details/:movieKey',
        component: 'movie-details-component'
    },
    {
        path: '/edit/:movieKey',
        component: 'edit-movie-component'
    }
]);
