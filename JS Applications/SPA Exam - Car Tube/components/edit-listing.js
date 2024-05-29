// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { Router } from 'https://unpkg.com/@vaadin/router';
import { editCar, getOneCar } from '../services/dbService.js'
import { dispatchNotificationEvent } from '../services/notificationService.js';


// Tagged function
const template = (context) => html`
       <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${context.onSubmit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${context.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${context.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="${context.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${context.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${context.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="${context.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
    `;

export default class EditListing extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.listingKey = this.location.params.listingKey;
        
        getOneCar(this.listingKey)
            .then(listingData => {
                Object.assign(this, listingData); // Attach listingData to this
                this.render();
            });
    }

    // Render method; good for scaling
    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = formData.get('year');
        let price = formData.get('price');
        let imageUrl = formData.get('imageUrl');

        if (brand.length < 0 || model.length < 0 || description.length < 0 || imageUrl.length < 0 || year.length < 0 || price.length < 0) {
            dispatchNotificationEvent('Please fill all the inputs!', 'error');
            return;
        }

        if (year < 0 || price < 0) {
            dispatchNotificationEvent('Year and price must be positive numbers!', 'error');
            return;
        }

        editCar(this.listingKey, {
            brand,
            model,
            description,
            year,
            price,
            imageUrl,
        })
            .then(res => {
                dispatchNotificationEvent('Car Listing editted!', 'success');
                Router.go(`/details/${this.listingKey}`);
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }
}