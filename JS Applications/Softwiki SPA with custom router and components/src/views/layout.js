// import { html, render } from 'lit-html'; // For webpack
import { html, render } from 'lit-html';
import header from './header.js';
import footer from './footer.js';

export default (temaplateResult, props) => html`    <!-- Pass props to header -->
    ${header(props)}
    
    <div id="layout-wrapper">
        ${temaplateResult(props)}
    </div> 

    ${footer()}
`;