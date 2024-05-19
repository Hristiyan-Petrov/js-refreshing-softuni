import '../styles/typography.css';
import '../styles/common.css';
import '../styles/form.css';
import '../styles/create.css';
import '../styles/home.css';
import '../styles/auth.css';
import '../styles/details.css';

import { html, render } from 'lit-html';

import layout from '../views/layout';
import home from '../views/home';

render(layout(home()), document.getElementById('app')); // Not hard, just follow the arg pass flow. Functional programming

