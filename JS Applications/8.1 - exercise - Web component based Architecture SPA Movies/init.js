// Using vaadin router; Docs: https://vaadin.github.io/router/vaadin-router/demo/#vaadin-router-getting-started-demos
// It solves the reloading when clicking (<a href> - links) out of the box
import { Router } from 'https://unpkg.com/@vaadin/router';

// Import components
import Home from './components/home.js';
import Register from './components/register.js';
import Notification from './components/notification.js';

// Register components
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('notification-component', Notification);

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
    }
]);