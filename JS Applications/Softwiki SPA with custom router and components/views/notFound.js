import { html } from 'lit-html';

export default ({
    navigationHandler
}) => html`
  <div class="container-404">
    <h1>404</h1>
    <p>Oops! The page you requested was not found.</p>
    <a href="/" @click=${navigationHandler}>Go back to home</a>
  </div>
`;