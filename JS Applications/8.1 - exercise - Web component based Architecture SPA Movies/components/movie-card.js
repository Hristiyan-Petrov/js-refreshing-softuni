import { html, render } from 'https://esm.run/lit-html@1';

// Tagged function
const template = (context) => html`
        <div class="card mb-4">
             <img class="card-img-top" src="${context.data.imageUrl}" alt="${context.data.title}" width="400">
             <div class="card-body">
                 <h4 class="card-title">${context.data.title}</h4>
             </div>
             <div class="card-footer">
                 <a href="/details/${context.data.key}"><button type="button" class="btn btn-info">Details</button></a>
             </div>
         </div>
`;

export default class MovieCard extends HTMLElement {

    connectedCallback() {
        // console.log(this.data);
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

}