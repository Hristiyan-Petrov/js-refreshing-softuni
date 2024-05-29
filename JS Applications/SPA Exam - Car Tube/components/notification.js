import { html, render } from 'https://esm.run/lit-html@1';

export default class Notification extends HTMLElement {
    constructor() {
        super();
        this.notification = null;
        this.type = null;
    }

    connectedCallback() {
        this.render();
        this.addEventListener('showNotification', this.handleShowNotification.bind(this));
    }

    // Event Handler for showing notifications on other pages. Dispaching it..., yea it's cmomplicated.
    // Creating new custom event on pages, and invoking this referense with passed parameters - dispatchNotificationEvent method
    handleShowNotification(e) {
        const { message, type } = e.detail;

        // Used in template from lit-html; 
        this.notification = message;
        this.type = type;

        this.render();
    }

    render() {
        // Define template here beacuse params are firing errors on initial app load 
        const template = (notification, type) => html`
            <style>
              .notification {
                  /* Contidional statement; can use because of lit-html */
                display: ${this.notification ? 'block' : 'none'};
                padding: 1rem;
                color: white;
                font-weight: bold;
              }

              .success {
                background-color: rgba(1, 131, 29, 0.541);
              }

              .error {
                background-color: rgba(255, 0, 0, 0.5);
              }
            </style>

      <div class="notification ${this.type}">${this.notification}</div>
    `;

        render(template(this.notification, this.type), this);

        if (this.notification) {
            setTimeout(() => {
                this.notification = null;
                this.type = null;
                this.render();
            }, 3000);
        }
    }
}