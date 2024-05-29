import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { getAllCars } from '../services/dbService.js';

// Tagged function
const template = (context) => html`
     <section id="car-listings">

        ${context.cars
        ? html`
            <h1>Car Listings</h1>
                <div class="listings">

                    <!-- Display all records -->
                    ${context.cars?.map(car => html`<listing-card .data=${car}></lisiting-card>`)}  
            `
        : html`
                <!-- Display if there are no records -->
                <p class="no-cars">No cars in database.</p>
            `
    }
            </div>
        </section>
    `;

export default class Listings extends HTMLElement {

    connectedCallback() {
        getAllCars()
            .then(cars => {
                this.cars = cars;   // this is the 'context' param in template func

                // Render second with dynamic cars
                this.render();
            })

        // Render first without cars
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

}