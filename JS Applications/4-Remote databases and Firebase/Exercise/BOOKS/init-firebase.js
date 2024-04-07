// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzk0_derDzm_gZQN7F5fUfQMse2Hb9Y0I",
    authDomain: "js-app-ex-rem-dbs-blogs-2024.firebaseapp.com",
    projectId: "js-app-ex-rem-dbs-blogs-2024",
    storageBucket: "js-app-ex-rem-dbs-blogs-2024.appspot.com",
    messagingSenderId: "686447973401",
    appId: "1:686447973401:web:8d7c6516f6277f94260688"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);