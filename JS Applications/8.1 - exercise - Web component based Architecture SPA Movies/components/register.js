// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { register } from '../services/authServices.js'
import { Router } from 'https://unpkg.com/@vaadin/router';


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
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (password.length < 6) {
            this.dispatchNotificationEvent('Password must be greater that 6 characters!', 'error');
            return;
        }

        if (password !== repeatPassword) {
            this.dispatchNotificationEvent('Passwords must match!', 'error');
            return;
        }

        register(email, password)
            .then(res => {
                this.dispatchNotificationEvent('Successfully registered!', 'success');
                // TO DO: redirect home
                Router.go('/');
            })
            .catch(err => {
                this.dispatchNotificationEvent(err, 'error');
            });
    }


    // Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

    // This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display
    dispatchNotificationEvent(message, type) {
        const notificationComponent = this.getRootNode().querySelector('notification-component');
        const notificationEvent = new CustomEvent('showNotification', {
            detail: {
                message,
                type
            },
            bubbles: true, // Add this option to allow event bubbling
            composed: true // Add this option to allow event propagation across Shadow DOM boundaries
        });
        notificationComponent.dispatchEvent(notificationEvent);
    }
}