import { collection, db } from "./firebase-config.js"

// Function for loading partials
export async function extendContext(context) {
    const partials = await Promise.all([
        context.load('../templates/partials/header.hbs'),
        context.load('../templates/partials/footer.hbs')
    ]);

    context.partials = {
        header: partials[0],
        footer: partials[1]
    }
}

// Helper functions

export function saveUser(data, context) {
    let { user: { email, uid } } = data;

    context.userData = {
        isLoggedIn: Boolean(uid),
        email,
        uid
    }
    // localStorage.setItem('userData', JSON.stringify({ email, uid }));
}

export function getUserData(context) {
    let user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
}

export function clearUserData(context) {
    console.log(context);
    delete context.userData;
    // localStorage.removeItem('userData');
}

export function isCreator(uid) {
    return uid === getUserData().uid;
}

export const dbRef = collection(db, 'offers');