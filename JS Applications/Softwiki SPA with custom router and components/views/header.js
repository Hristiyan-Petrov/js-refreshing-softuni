// import { html, render } from 'lit-html'; // For webpack
import { html, render } from '../node_modules/lit-html/lit-html.js';

export default ({
    navigationHandler   // Recieved from app.js, throught layout 
}) => html`
    <header @click=${navigationHandler}>    <!-- Attach with lit-html syntax -->
        <h1><a class="home" href="/">SoftWiki</a></h1>
        <nav class="nav-buttons">

            <a href="/login">Login</a>

            <a href="/create">Create</a>
            <a href="/logout">Logout</a>
            <a href="/register">Register</a>
        </nav>
    </header>
`;