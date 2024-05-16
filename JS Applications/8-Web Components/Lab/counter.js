// my-component.js
class MyCounter extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root to encapsulate the component's styles and markup
        this.attachShadow({ mode: 'open' });

        // Get the template element
        const template = document.getElementById('my-counter-template');
        const templateContent = template.content;

        // Clone the template content and append it to the shadow root
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Get references to the component elements
        this.counterValue = this.shadowRoot.querySelector('span');
        this.incrementBtn = this.shadowRoot.querySelector('button');

        // Initialize the counter value
        this.counterValue.textContent = '0';

        // Add event listener to the button
        this.incrementBtn.addEventListener('click', () => this.increment());
    }

    increment() {
        const currentValue = parseInt(this.counterValue.textContent, 10);
        this.counterValue.textContent = currentValue + 1;
    }
}

// Define the new custom element
customElements.define('my-counter', MyCounter);