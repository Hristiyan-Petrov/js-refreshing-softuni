import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { getSearchedCars } from '../services/dbService.js';
// import { getUserData } from '../services/authServices.js';

// Tagged function
const template = (context) => html`
     <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button class="button-list" @click=${context.onSearch}>Search</button>
            </div>


            <h2>Results:</h2>
            <div class="listings" style="display: none;">

                ${context.cars
        ? html`
                        <!-- Display all records -->
                        ${context.cars?.map(car => html`<listing-card .data=${car}></lisiting-card>`)}  
                    `
        : html`
                        <p class="no-cars"> No results.</p>
                    `
    }
            </div>
        </section>
    `;

export default class SearchListings extends HTMLElement {

    connectedCallback() {
        // Render first without cars
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onSearch() {
        let searchingYear = document.getElementById('search-input').value;
        getSearchedCars(searchingYear)
            .then(cars => {
                this.cars = cars.length > 0 ? cars : undefined;
                this.render();
                document.querySelector('.listings').style.display = 'block';
            });
    }
}