import { html, render, directive } from 'https://esm.run/lit-html@1';
import { getOneMovie, likeMovie } from '../services/dbService.js';
import { getUserData } from '../services/authServices.js';
import { likeDirective } from '../directives/likeDirective.js';

// const likeDirective = directive(() => (part) => { part.setValue('Like') });
// Directives are very complicated

const isLiked = (likes, currUid) => {
    return Object
        .values(likes)
        .some(uid => uid === currUid);
}


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

                    <!-- <h3>${likeDirective()}</h3> -->

                    ${context.creator === context.user.uid
                        ? html`
                            <a class="btn btn-danger" href="#">Delete</a>
                            <a class="btn btn-warning" href="#">Edit</a>
                        `   
                        : html`
                            ${isLiked(context.likes, context.user.uid)
                                ? html`<span class="enrolled-span">Liked ${Object.keys(context.likes).length}</span>`
                                : html`<a class="btn btn-primary" @click=${context.onLike}>Like</a>`
                            }                            
                        `
                    }
                </div>
            </div>
        </div>
`;

export default class MovieDetails extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
    }

    connectedCallback() {
        // console.log(this.location.params.movieKey);

        getOneMovie(this.location.params.movieKey)
            .then(movieData => {
                // console.log(movieData);
                Object.assign(this, movieData); // Attach movieData to this
                this.render();
            });
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onLike(e) {
        likeMovie(this.location.params.movieKey, this.user.uid)
            .then(res => {
                console.log(res);
                this.render();
            })
    }

}