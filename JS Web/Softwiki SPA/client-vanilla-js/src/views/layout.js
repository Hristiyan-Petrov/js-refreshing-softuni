// import { html, render } from 'lit-html'; // For webpack
import { html, render } from 'lit-html';
import header from './header.js';
import footer from './footer.js';

const notificationBar = html`
<div class="notification-top-bar"></div>
`;

export default (temaplateResult, props) => html`    <!-- Pass props to header -->
    ${header(props)}

    <!-- TODO: Notification bar -->

    ${notificationBar}

    <div id="layout-wrapper">
        ${temaplateResult(props)}
    </div> 

    ${footer()}
`;