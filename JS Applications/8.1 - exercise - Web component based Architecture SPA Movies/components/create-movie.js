// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { Router } from 'https://unpkg.com/@vaadin/router';
import { addMovie } from '../services/dbService.js'
import { dispatchNotificationEvent } from '../services/notificationService.js';
import { getUserData } from '../services/authServices.js';


// Tagged function
const template = (context) => html`
      <form class="text-center border border-light p-5" action="#" method="" @submit=${context.onSubmit}>
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;

export default class CreateMovie extends HTMLElement {

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
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        if (title.length < 0 || description.length < 0 || imageUrl.length < 0) {
            dispatchNotificationEvent('Please fill all the inputs!', 'error');
            return;
        }

        addMovie({
            title,
            description,
            imageUrl,
            creator: getUserData().uid,
            likes: []
        })
            .then(res => {
                dispatchNotificationEvent('Movie added!', 'success');
                // TO DO: redirect home
                Router.go('/');
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }


    // Implemented the `dispatchNotificationEvent` method in the `Register` component to create and dispatch the custom event on the `NotificationComponent` instance, ensuring proper event propagation.

    // This method creates a custom event 'showNotification' with the provided message and type, and dispatches it on the NotificationComponent instance to trigger the notification display
    
}