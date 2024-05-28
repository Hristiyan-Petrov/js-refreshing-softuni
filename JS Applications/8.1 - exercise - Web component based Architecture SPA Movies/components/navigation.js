import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { getUserData } from '../services/authServices.js';

// Tagged function
const template = (context) => html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <!-- Only '/' route goes to the main route -->
            <a class="navbar-brand text-light" href="/">Movies</a>
            <ul class="navbar-nav ml-auto ">
                ${context.isAuthenticated
                    ? html`
                        <li class="nav-item">
                            <a class="nav-link">Welcome, ${context.email}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">Logout</a>
                        </li>
                    `
                    : html`
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                        </li>
                    `
                }
            </ul>
        </nav>
    `;

export default class CreateMovie extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        Object.assign(this, getUserData());
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }
}