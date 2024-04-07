// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHfiPZtTircxxH6O6uGllF7vQxYd7u-mM",
    authDomain: "movies-2024-ad36f.firebaseapp.com",
    projectId: "movies-2024-ad36f",
    storageBucket: "movies-2024-ad36f.appspot.com",
    messagingSenderId: "353898698528",
    appId: "1:353898698528:web:68f65fda59eb17d7e42945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();

let buttonEl = document.getElementById('login-button');
buttonEl.addEventListener('click', onUserLogin)

function onUserLogin(e) {
    let usernameEl = document.getElementById('username');
    let passwordEl = document.getElementById('password');
    let headerEl = document.getElementById('header');
    let loginFormEl = document.getElementById('login-form');


    signInWithEmailAndPassword(auth, usernameEl.value, passwordEl.value)
        .then(res => {
            console.log('logged in');
            console.log(res);
            headerEl.innerText = `Hello, ${res.user.email}`;
            loginFormEl.style.display = 'none';
        })
        .catch(err => {
            console.log(err);
        })
}