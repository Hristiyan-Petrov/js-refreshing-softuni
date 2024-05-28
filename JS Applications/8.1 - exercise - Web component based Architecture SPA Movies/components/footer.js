import { html, render } from 'https://esm.run/lit-html@1';

// Tagged function
const template = (context) => html`
        <footer class="page-footer font-small">
            <div class="footer-copyright text-center py-3">© 2020
                <a href="https://softuni.bg/trainings/2840/js-applications-june-2020/internal" class="text-dark">JS
                    Applications</a>
            </div>
        </footer>
    `;

export default class CreateMovie extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }
}