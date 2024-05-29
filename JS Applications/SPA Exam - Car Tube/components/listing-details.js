import { html, render, nothing } from 'https://esm.run/lit-html@1';
import { getOneCar, deleteListing } from '../services/dbService.js';
import { getUserData } from '../services/authServices.js';
import { dispatchNotificationEvent } from '../services/notificationService.js';
import { Router } from 'https://unpkg.com/@vaadin/router';

// const likeDirective = directive(() => (part) => { part.setValue('Like') });
// Directives are very complicated

// const isLiked = (likes, currUid) => {
//     return likes
//         ? Object
//             .values(likes)
//             .some(uid => uid === currUid)
//         : [];

// }

// Tagged function
const template = (context) => html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${context.imageUrl}" alt=${context.brand}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand: </span>${context.brand}</li>
                    <li><span>Model: </span>${context.model}</li>
                    <li><span>Year: </span>${context.year}</li>
                    <li><span>Price: </span>${context.price} $</li>
                </ul>

                <p class="description-para">${context.description}</p>

                ${context._creator === context.user.uid
        ? html`
                        <div class="listings-buttons">
                            <a href="/edit/${context.location.params.listingKey}" class="button-list">Edit</a>
                            <a class="button-list" @click=${context.onDelete}>Delete</a>
                        </div>
                    `
        : nothing
    }
            </div>
        </section>
`;

export default class ListingDetails extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
    }

    connectedCallback() {
        getOneCar(this.location.params.listingKey)
            .then(listingData => {
                // console.log(listingData);
                Object.assign(this, listingData); // Attach listingData to this
                this.render();
            });
    }

    render() {
        render(template(this), this, { eventContext: this }); // This is the current class instanse - 'class Register'
    }

    onDelete() {
        deleteListing(this.location.params.listingKey)
            .then(() => {
                dispatchNotificationEvent('Listing deleted!', 'success');
                Router.go('/listings');
            });
    }

    // onLike(e) {
    //     likeMovie(this.location.params.listingKey, this.user.uid)
    //         .then(res => {
    //             console.log(res);
    //             dispatchNotificationEvent('Liked', 'success');
    //             this.connectedCallback();
    //         })
    // }

    // getLastFiveLikes(likesArray) {
    //     // Reverse the order so the most recent likes are first, take the last 5, and join them with a line break
    //     return 'Last 5 likes:\n' + likesArray.reverse().slice(0, 5).join('\n');
    // }
}