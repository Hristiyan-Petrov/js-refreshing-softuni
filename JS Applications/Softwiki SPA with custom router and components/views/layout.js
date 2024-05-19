import { html, render } from 'lit-html';
import header from '../views/header';
import footer from './footer';

export default (temaplateResult) => html`
    ${header()}
    
    <div id="layout-wrapper">
        ${temaplateResult}
    </div> 

    ${footer()}
`;