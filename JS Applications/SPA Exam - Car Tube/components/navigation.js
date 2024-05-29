import { html, render } from 'https://esm.run/lit-html@1';
import { getUserData, logout } from '../services/authServices.js';
import { dispatchNotificationEvent } from '../services/notificationService.js';
import { Router } from 'https://unpkg.com/@vaadin/router';

// Tagged function
const template = (context) => html`
     <header>
        <nav>
            <a class="active" href="/">Home</a>
            <a href="/listings">All Listings</a>
            <a href="/search">By Year</a>

            ${!context.isAuthenticated
        ? html`
                    <!-- Guest users -->
                    <div id="guest">
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                `
        : html`
                    <!-- Logged users -->
                    <div id="profile">
                        <a>Welcome ${context.email}</a>
                        <a href="/my-listings">My Listings</a>
                        <a href="/create">Create Listing</a>
                        <a @click=${context.onLogout}>Logout</a>
                    </div>
                `
    }
        </nav>
    </header>
    `;

export default class Navigation extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        Object.assign(this, getUserData());
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onLogout() {
        logout();
        dispatchNotificationEvent('Logged out!', 'success');
        Router.go('/');
        // Force reload home page if it is on it while clicking logout
        document.querySelector('home-component').connectedCallback();
    }
}