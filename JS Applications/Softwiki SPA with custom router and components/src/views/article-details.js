import { html, render } from 'lit-html';

export default ({
    title,
    category,
    content,
    objectId,
    ownerId,
    uid,
    onBackClick,
    navigationHandler,
    onDeleteClick
}) => html`
   <div class="container details">
        <div class="details-content">
            <h2>${title}</h2>
            <strong>${category}</strong>
            <p>${content}</p>
            <div class="buttons">
                ${ownerId === uid
                    ?
                        html`
                        <a class="btn delete" data-adticleid=${objectId} @click=${onDeleteClick}>Delete</a>
                        <a href="/edit/${objectId}" class="btn edit" @click=${navigationHandler}>Edit</a>
                        `
                    : html`
                        <a class="btn back" @click=${onBackClick}>Back</a>
                    `
                }
            </div>
        </div>
    </div>
`;