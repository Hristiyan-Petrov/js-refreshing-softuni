// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { register } from '../services/authServices.js'
import { Router } from 'https://unpkg.com/@vaadin/router';
import { dispatchNotificationEvent } from '../services/notificationService.js';


// Tagged function
const template = (context) => html`
     <section id="register">
            <div class="container">
                <form id="register-form" @submit=${context.onSubmit}>
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" name="email" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
        </section>
    `;

export default class Register extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');

        if (password.length < 6) {
            dispatchNotificationEvent('Password must be greater that 6 characters!', 'error');
            return;
        }

        if (password !== repeatPass) {
            this.dispatchNotificationEvent('Passwords must match!', 'error');
            return;
        }

        register(email, password)
            .then(res => {
                dispatchNotificationEvent('Successfully registered!', 'success');
                // TO DO: redirect home
                Router.go('/login');
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }


    // Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

    // This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display
    
}