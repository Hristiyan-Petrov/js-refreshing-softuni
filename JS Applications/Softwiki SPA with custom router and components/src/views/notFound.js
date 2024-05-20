import { html } from 'lit-html';

export default ({
    navigationHandler
}) => html`
    <div class="container-404">
        <h1>404</h1>
        <p>Oops! The page you requested was not found. It seems like you've taken a wrong turn. Let's get you back home.</p>
        <a href="/" @click=${navigationHandler}>Go back to home</a>
    </div>
`;