import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "./init-firebase.js";

const mainWrapper = document.getElementById('main-wrapper');
const authenticationSection = document.getElementById('authentication');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const logoutButton = document.getElementById('logout-button');

let registerUsernameEl = document.getElementById('register-email');
let registerPasswordEl = document.getElementById('register-password');
let loginUsernameEl = document.getElementById('login-email');
let loginPasswordEl = document.getElementById('login-password');

registerButton.addEventListener('click', function (e) {
    let registerUsername = registerUsernameEl.value;
    let registerPassword = registerPasswordEl.value;

    createUserWithEmailAndPassword(auth, registerUsername, registerPassword)
        .then(userCredential => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email);

            authenticationSection.style.display = 'none';
            mainWrapper.style.display = 'block';
            let headerGreetEl = document.getElementById('header-greet');
            headerGreetEl.textContent = user.email;
        })
        .catch((error) => {
            console.log(error.message);
        });
});

loginButton.addEventListener('click', function (e) {

    let loginUsername = loginUsernameEl.value;
    let loginPassword = loginPasswordEl.value;

    signInWithEmailAndPassword(auth, loginUsername, loginPassword)
        .then(userCredential => {
            // Logged in 
            const user = userCredential.user;
            console.log(user.email);

            authenticationSection.style.display = 'none';
            mainWrapper.style.display = 'block';
            let headerGreetEl = document.getElementById('header-greet');
            headerGreetEl.textContent = user.email + '!';
        })
        .catch((error) => {
            let errorField = e.target.parentElement.querySelector('.error-message');
            errorField.textContent = error.message;
            console.log(error.message);
        });
});

logoutButton.addEventListener('click', function (e) {
    signOut(auth)
        .then(() => {
            // Clear input login and rigister fields, not sure if need to be done here but here is the only variant (known for now)
            registerUsernameEl.value = '';
            registerPasswordEl.value = '';
            loginUsernameEl.value = '';
            loginPasswordEl.value = '';

            authenticationSection.style.display = 'block';
            mainWrapper.style.display = 'none';
        })
});