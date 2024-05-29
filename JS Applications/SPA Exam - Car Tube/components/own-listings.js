import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { getAllOwnCars } from '../services/dbService.js';
import { getUserData } from '../services/authServices.js';

// Tagged function
const template = (context) => html`
     <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">

            ${context.cars
        ? html`
                    <!-- Display all records -->
                    ${context.cars?.map(car => html`<listing-card .data=${car}></lisiting-card>`)}  
                `
        : html`
                    <!-- Display if there are no records -->
                    <p class="no-cars"> You haven't listed any cars yet.</p>
                `
    }
            </div>
        </section>
    `;

export default class OwnListings extends HTMLElement {

    connectedCallback() {
        getAllOwnCars(getUserData().uid)
            .then(cars => {
                this.cars = cars.length > 0 ? cars : undefined;

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