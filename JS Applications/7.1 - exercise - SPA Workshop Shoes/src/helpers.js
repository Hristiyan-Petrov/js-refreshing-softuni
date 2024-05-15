import { collection, db } from "./firebase-config.js"

// Function for loading partials
export async function extendContext(context) {
    const partials = await Promise.all([
        context.load('../partials/header.hbs'),
        context.load('../partials/footer.hbs')
    ]);

    context.partials = {
        header: partials[0],
        footer: partials[1]
    }
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