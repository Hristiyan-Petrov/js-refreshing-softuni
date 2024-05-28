import { html, render } from 'https://esm.run/lit-html@1';
import { getAllMovies } from '../services/dbService.js';

// Tagged function
const template = (context) => html`
        <h1 class="text-center">Movies</h1>
        <section>
            <a href="/create" class="btn btn-warning ">Add Movie</a>
            <form class="search float-right">
                <label>Search: </label>
                <input type="text">
                <input type="submit" class="btn btn-info" value="Search">
            </form>
        </section>
        
        <div class=" mt-3 ">
            <div class="row d-flex d-wrap">
                <div class="card-deck d-flex justify-content-center">

                    <!-- 'List rendering'and 'Property binding' techniques from Custom Components presentation. Comes from lit-html library -->
                    <!-- ? - optiinal chaining; don't fire error if context.movies is undefined -->
                    ${context.movies?.map(movie => html`<movie-card .data=${movie}></movie-card>`)}  
                      
                    <!-- TO DO: If there are no movies show 'no movies' card or smth. Or loading... -->
                </div>
            </div>
        </div>
`

export default class Movies extends HTMLElement {

    connectedCallback() {
        getAllMovies()
            .then(movies => {                
                this.movies = movies;   // this is the 'context' param in template func

                // Render second with dynamic movies
                this.render();
            })

        // Render first without movies
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

}