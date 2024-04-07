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

let loginUsername = document.getElementById('login-email').value;
let loginPassword = document.getElementById('login-password').value;




registerButton.addEventListener('click', function (e) {
    let registerUsername = document.getElementById('register-email').value;
    let registerPassword = document.getElementById('register-password').value;

    createUserWithEmailAndPassword(auth, registerUsername, registerPassword)
        .then(userCredential => {
            // Signed in 
            console.log(userCredential);
            const user = userCredential.user;
            console.log(user);

            authenticationSection.style.display = 'none';
            mainWrapper.style.display = 'block';
            let headerGreetEl = document.getElementById('header-greet');
            headerGreetEl.textContent += user.email;

        })
        .catch((error) => {
            console.log(error.message);
        });
});