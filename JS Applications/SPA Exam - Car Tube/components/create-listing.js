// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { Router } from 'https://unpkg.com/@vaadin/router';
import { addCar } from '../services/dbService.js'
import { dispatchNotificationEvent } from '../services/notificationService.js';
import { getUserData } from '../services/authServices.js';


// Tagged function
const template = (context) => html`
       <section id="create-listing">
            <div class="container">
                <form id="create-form" @submit=${context.onSubmit}>
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
    `;

export default class CreateListing extends HTMLElement {

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

        addCar({
            brand,
            model,
            description,
            year,
            price,
            imageUrl,
            _creator: getUserData().uid,
            // likes: []
        })
            .then(res => {
                dispatchNotificationEvent('Car Listing added!', 'success');
                Router.go('/listings');
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }


    // Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

    // This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display

}