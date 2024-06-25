// import { html, render } from 'lit-html'; // For webpack
import { html, render } from 'lit-html';

const loggedInLinks = (email, onLogout) => html`
    <a>Hello, ${email.slice(0, email.indexOf('@'))}</a>
    <a href="/create">Create</a>
    <a @click=${onLogout}>Logout</a>
`;

const guestLinks = html`
    <h1><a href="/register">Register</a></h1>
`;

export default ({
    navigationHandler,   // Recieved from app.js, throught layout 
    isAuthenticated,
    email,
    onLogout
}) => html`
    <header @click=${navigationHandler}>    <!-- Attach with lit-html syntax -->

        ${isAuthenticated
        ? html`
            <h1><a class="home" href="/">SoftWiki</a></h1>
            `
        : html`
            <h1><a href="/login">Login</a></h1>
            `
    }

    <nav class="nav-buttons">

    <!-- Dynamic content depending on if user is logged -->
    ${isAuthenticated
        ? loggedInLinks(email, onLogout)
        : guestLinks
    }
</nav>
    </header >
    `;