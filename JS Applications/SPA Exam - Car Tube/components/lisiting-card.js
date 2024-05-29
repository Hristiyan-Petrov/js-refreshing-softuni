import { html, render } from 'https://esm.run/lit-html@1';

// Tagged function
const template = (context) => html`
         <div class="listing">
            <div class="preview">
                <img src="${context.data.imageUrl}" alt=${context.data.brand}>
            </div>
            <h2>${context.data.brand} ${context.data.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${context.data.year}</h3>
                    <h3>Price: ${context.data.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${context.data.key}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
`;

export default class ListingCard extends HTMLElement {

    connectedCallback() {
        // console.log(this.data);
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

}