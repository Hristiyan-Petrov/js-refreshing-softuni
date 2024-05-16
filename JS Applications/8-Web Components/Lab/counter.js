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
        this.counterValue = this.shadowRoot.querySelector('.counter-value');
        this.decrementBtn = this.shadowRoot.querySelector('.decrement');
        this.incrementBtn = this.shadowRoot.querySelector('.increment');
        this.confettiContainer = this.shadowRoot.querySelector('.confetti-container');

        // Initialize the counter value and properties
        this.value = this.hasAttribute('start-value') ? parseInt(this.getAttribute('start-value')) : 0;
        this.max = this.hasAttribute('max') ? parseInt(this.getAttribute('max')) : Infinity;
        this.step = this.hasAttribute('step') ? parseInt(this.getAttribute('step')) : 1;
        this.showConfetti = this.hasAttribute('confetti');

        // Render the initial counter value
        this.renderValue();

        // Add event listeners
        this.decrementBtn.addEventListener('click', () => this.decrement());
        this.incrementBtn.addEventListener('click', () => this.increment());
    }

    renderValue() {
        this.counterValue.textContent = this.value;
        this.counterValue.style.transform = 'scale(1)';

        // Show confetti if the attribute is present and the value is equal to the max
        if (this.showConfetti && this.value === this.max) {
            this.showConfettiAnimation();
        }
    }

    increment() {
        if (this.value < this.max) {
            this.value += this.step;
            this.renderValue();
        }
    }

    decrement() {
        if (this.value > 0) {
            this.value -= this.step;
            this.renderValue();
        }
    }

    showConfettiAnimation() {
        const canvas = this.confettiContainer;
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true,
        });

        myConfetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
        });

        setTimeout(() => {
            myConfetti.reset();
        }, 5000);
    }
}

// Define the new custom element
customElements.define('my-counter', MyCounter);