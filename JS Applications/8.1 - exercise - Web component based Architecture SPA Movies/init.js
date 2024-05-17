// Using vaadin router; Docs: https://vaadin.github.io/router/vaadin-router/demo/#vaadin-router-getting-started-demos
// It solves the reloading when clicking (<a href> - links) out of the box

import {Router} from 'https://unpkg.com/@vaadin/router';

const rootElement = document.getElementById('root');
const router = new Router(rootElement);

// router.setRoutes([
//     {
//         path: '/',
//         component: 'home-component'
//     },
//     {
//         path: '/register',
//         component: 'register-component'
//     }
// ]);