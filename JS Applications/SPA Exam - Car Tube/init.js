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
import Listings from './components/listings.js';
import ListingCard from './components/lisiting-card.js';
import ListingDetails from './components/listing-details.js';
import CreateListing from './components/create-listing.js';
import EditListing from './components/edit-listing.js';
import OwnListings from './components/own-listings.js';
import SearchListings from './components/search-by-year-listings.js';

// Register components
customElements.define('navigation-component', Navigation);
customElements.define('footer-component', Footer);
customElements.define('notification-component', Notification);
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('listings-component', Listings);
customElements.define('listing-card', ListingCard);
customElements.define('listing-details-component', ListingDetails);
customElements.define('create-listing-component', CreateListing);
customElements.define('edit-listing-component', EditListing);
customElements.define('own-listings', OwnListings);
customElements.define('search-by-year-component', SearchListings);

const rootElement = document.getElementById('site-content');
const router = new Router(rootElement);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    }, {
        path: '/listings',
        component: 'listings-component'
    },
    {
        path: '/my-listings',
        component: 'own-listings'
    },
    {
        path: '/register',
        component: 'register-component'
    },
    {
        path: '/login',
        component: 'login-component'
    },
    // {
    //     path: '/logout',
    //     action: () => {
    //         logout();
    //         // TO DO: redirect
    //         // return commands.redirect('/');

    //         let homeComponent = document.querySelector('home-component');
    //         if (homeComponent) {
    //             dispatchNotificationEvent('Logged out!', 'success')
    //             homeComponent.connectedCallback();
    //         }
    //     },
    //     component: 'home-component'
    // },
    {
        path: '/create',
        component: 'create-listing-component'
    },
    {
        path: '/details/:listingKey',
        component: 'listing-details-component'
    },
    {
        path: '/edit/:listingKey',
        component: 'edit-listing-component'
    },
    {
        path: '/search',
        component: 'search-by-year-component'
    }
]);
