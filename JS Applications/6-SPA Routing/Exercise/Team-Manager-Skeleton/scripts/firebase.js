// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiM6mXa1TIwQ44UPy7udIb4xTxhVvNdiU",
    authDomain: "team-manager-routing-exercise.firebaseapp.com",
    projectId: "team-manager-routing-exercise",
    storageBucket: "team-manager-routing-exercise.appspot.com",
    messagingSenderId: "652949455922",
    appId: "1:652949455922:web:dfe3969f43ce47c9fe682b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

const auth = getAuth(app);

// Realtime Database
import { getDatabase, ref, set, push, get, update } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
const db = getDatabase(app, 'https://team-manager-routing-exercise-default-rtdb.firebaseio.com/');

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    db,
    push,
    ref,
    set,
    get,
    update
};