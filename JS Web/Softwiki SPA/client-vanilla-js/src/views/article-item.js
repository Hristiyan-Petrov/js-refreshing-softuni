import { html, render } from 'lit-html';

export default ({
    title,
    content, 
    objectId,
    navigationHandler
}) => html`
    <article>
        <h3>${title}</h3>
        <p>${content}</p>
        <a href="/details/${objectId}" class="btn details-btn" @click=${navigationHandler}>Details</a>
    </article>
`;