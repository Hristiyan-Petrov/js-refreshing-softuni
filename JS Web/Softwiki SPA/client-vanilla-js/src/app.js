// Actually is not custom component based app. It is kinda using MVC but simplified version. Using Webpack as well.

import '../styles/typography.css'; // Webpack usage
import '../styles/common.css';
import '../styles/form.css';
import '../styles/create.css';
import '../styles/home.css';
import '../styles/auth.css';
import '../styles/details.css';
import '../styles/notFound.css';

import { router } from './router.js'

router(location.pathname); // Get the current route and invoke the func to load the corresponding view
