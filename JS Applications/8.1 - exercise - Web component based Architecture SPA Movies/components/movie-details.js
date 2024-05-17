import { html, render } from 'https://esm.run/lit-html@1';
import { getOneMovie } from '../services/dbService.js';

// Tagged function
const template = (context) => html`
        <div class="container">
            <div class="row bg-light text-dark">
            <h1>Movie title: ${context.title}</h1>
                
                <div class="col-md-8">
                    <img class="img-thumbnail" src="${context.imageUrl}" alt="${context.title}">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${context.description}</p>
                    <a class="btn btn-danger" href="#">Delete</a>
                    <a class="btn btn-warning" href="#">Edit</a>
                    <a class="btn btn-primary" href="#">Like</a>
                    <span class="enrolled-span">Liked 1</span>
                </div>
            </div>
        </div>
`;

export default class MovieDetails extends HTMLElement {
    connectedCallback() {
        // console.log(this.location.params.movieKey);

        getOneMovie(this.location.params.movieKey)
            .then(movieData => {
                Object.assign(this, movieData);
                this.render();
            });
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

}