// Use lit-html library for templating; Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';
import { getUserData } from '../services/authServices.js';

// Tagged function
const template = (context) => html`
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
            <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
                class="img-fluid" alt="Responsive image">
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div> 

        ${context.user.isAuthenticated
            ? html `<movies-component></movies-component>`
            : ''
        }
`;

export default class Home extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.user = getUserData();
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Home'
    }
}