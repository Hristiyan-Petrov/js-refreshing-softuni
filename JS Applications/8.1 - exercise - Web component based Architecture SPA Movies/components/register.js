// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Tagged function
const template = (context) => html`
    <form class="text-center border border-light p-5" action="#" method="post" @submit=${context.onSubmit}>  <!-- @eventName comes from lit-html -->
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>
        
            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
            </div>
        
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    `;

export default class Register extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContex: this }); // This is the current class instanse - 'Home'
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (password.length < 6) {
            console.error('password too short');
            return;
        }

        if (password !== repeatPassword) {
            console.error('passwords must match');
            return;
        }

        console.log('Registered');
    }
}