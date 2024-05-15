import { extendContext, saveUser, clearUserData } from '../helpers.js';
import {
    // Authentication
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "../firebase-config.js"
 
// Rendering functions

export function registerPage(context) {
    extendContext(context)
        .then(function () {
            this.partial('./templates/register.hbs');
        });
}

export function loginPage(context) {
    extendContext(context)
        .then(function () {
            this.partial('./templates/login.hbs');
        });
}

// Auth functions

export function registerPost(context) {
    let { email, password, rePassword } = context.params;

    if (password !== rePassword) {
        console.log('passwords must match');
        return;
    }

    // Use Firebase Auth to create a user
    createUserWithEmailAndPassword(auth, email, password)
        .then(userData => {
            console.log(userData);
            this.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
}

export function loginPost(context) {
    let { email, password } = context.params;

    signInWithEmailAndPassword(auth, email, password)
        .then(userData => {
            console.log(userData);
            saveUser(userData);
            this.redirect('/home');
        })
        .catch(err => {
            console.log(err);
        });
}

export function logout(context) {
    signOut(auth)
        .then(res => {
            clearUserData();
            console.log('logged out');
            this.redirect('/home');
        })
}
