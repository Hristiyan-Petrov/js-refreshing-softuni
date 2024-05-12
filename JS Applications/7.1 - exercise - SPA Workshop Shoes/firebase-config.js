import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcIr7fqdVoidKUobm7dDRC5wFq52xX8as",
    authDomain: "shoeshelf-251a2.firebaseapp.com",
    databaseURL: "https://shoeshelf-251a2.firebaseio.com",
    projectId: "shoeshelf-251a2",
    storageBucket: "shoeshelf-251a2.appspot.com",
    messagingSenderId: "422269810498",
    appId: "1:422269810498:web:1ca0522684a5cd1f307adb"
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