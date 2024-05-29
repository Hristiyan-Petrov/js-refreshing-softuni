import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { getUserData } from '../services/authServices.js';

// Tagged function
const template = (context) => html`
     <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/listings" class="button">Listings</a>
                </div>
            </div>
        </section>
    `;

export default class Home extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.user = getUserData();
        
        let navigationComponent = document.querySelector('navigation-component');
        navigationComponent.connectedCallback();
        
        this.render();
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Home'
    }
}