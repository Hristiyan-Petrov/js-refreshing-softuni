// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { login } from '../services/authServices.js'
import { Router } from 'https://unpkg.com/@vaadin/router';
import { dispatchNotificationEvent } from '../services/notificationService.js';


// Tagged function
const template = (context) => html`
    <section id="login">
            <div class="container">
                <form id="login-form" action="#" method="post" @submit=${context.onSubmit}>
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Email</p>
                    <input placeholder="Enter Email" name="email" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>
    `;

export default class Login extends HTMLElement {

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

        if (!email.includes('@') || !email.includes('.')) {
            dispatchNotificationEvent('Please enter valid email!', 'error');
            return;
        }

        if (password.length < 0 || email.length < 0) {
            dispatchNotificationEvent('Please fill all the inputs!', 'error');
            return;
        }

        login(email, password)
            .then(res => {
                dispatchNotificationEvent('Logged in!', 'success');
                // TO DO: redirect home
                Router.go('/');
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }


    // Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

    // This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display
    
}