import { html } from 'lit-html';

export default () => html`
    <div class="container-404">
        <h1>Oops!</h1>
        <p>The page you requested was not found. It seems like you've taken a wrong turn. Let's get you back <a href="/">home</a></p>
    </div>
`;