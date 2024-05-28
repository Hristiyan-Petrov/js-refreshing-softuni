// Use lit-html library for templating, Docs: https://lit.dev/docs/v1/lit-html/introduction/
import { html, render } from 'https://esm.run/lit-html@1';

// Named import
import { Router } from 'https://unpkg.com/@vaadin/router';
import { editMovie, getOneMovie } from '../services/dbService.js'
import { dispatchNotificationEvent } from '../services/notificationService.js';


// Tagged function
const template = (context) => html`
       <form class="text-center border border-light p-5" action="#" method="" @submit=${context.onSubmit}>
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value="${context.title}" name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." name="description">${context.description}</textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value="${context.imageUrl}" name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;

export default class EditMovie extends HTMLElement {

    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.movieKey = this.location.params.movieKey;
        
        getOneMovie(this.movieKey)
            .then(movieData => {
                Object.assign(this, movieData); // Attach movieData to this
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
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        if (title.length < 0 || description.length < 0 || imageUrl.length < 0) {
            dispatchNotificationEvent('Please fill all the inputs!', 'error');
            return;
        }

        editMovie(this.movieKey, {
            title,
            description,
            imageUrl,
        })
            .then(res => {
                dispatchNotificationEvent('Movie editted!', 'success');
                Router.go(`/details/${this.movieKey}`);
            })
            .catch(err => {
                dispatchNotificationEvent(err, 'error');
            });
    }
}