import { collection , db} from "./firebase-config.js"

// Function for loading partials
export function extendContext(context) {

    let user = getUserData();
    // Check if logged user
    context.isLoggedIn = Boolean(user);
    context.email = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    });
}

// Helper functions

export function saveUser(data) {
    let { user: { email, uid } } = data;
    localStorage.setItem('userData', JSON.stringify({ email, uid }));
}

export function getUserData() {
    let user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
}

export function clearUserData() {
    localStorage.removeItem('userData');
}

export function isCreator(uid) {
    return uid === getUserData().uid;
}

export const dbRef = collection(db, 'offers');