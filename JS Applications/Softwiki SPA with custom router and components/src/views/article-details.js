import { html, render } from 'lit-html';

export default ({
    title,
    category,
    content,
    objectId
}) => html`
   <div class="container details">
        <div class="details-content">
            <h2>${title}</h2>
            <strong>${category}</strong>
            <p>${content}</p>
            <div class="buttons">
                <a href="/delete/${objectId}" class="btn delete">Delete</a>
                <a href="/edit/${objectId}" class="btn edit">Edit</a>
                <a href="/back" class="btn back">Back</a>
            </div>
        </div>
    </div>
`;