// import { html, render } from 'lit-html'; // For webpack
import { html, render } from 'lit-html';

const loggedInLinks = (email, onLogout) => html`
    <a>Hello ${email}</a>
    <a href="/create">Create</a>
    <a @click=${onLogout}>Logout</a>
`;

const guestLinks = html`
    <a href="/register">Register</a>
`;

export default ({
    navigationHandler,   // Recieved from app.js, throught layout 
    isAuthenticated,
    email,
    onLogout
}) => html`
    <header @click=${navigationHandler}>    <!-- Attach with lit-html syntax -->
        <h1><a class="home" href="/">SoftWiki</a></h1>
        <nav class="nav-buttons">
            
        <!-- Dynamic content depending on if user is logged -->
            ${isAuthenticated
        ? loggedInLinks(email, onLogout)
        : guestLinks
    }
        </nav>
    </header>
`;