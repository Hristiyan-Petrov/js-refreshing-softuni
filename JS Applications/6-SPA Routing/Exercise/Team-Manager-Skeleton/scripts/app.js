import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "./firebase.js";

const router = Sammy('#main', function () { //#main is the root element in which the content will be rendered

    // Present template angine and file extension for Sammy to compile 
    this.use('Handlebars', 'hbs');

    // GET requests

    this.get('/home', function (context) { // Context comes from Sammy out of the box as function argument

        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserLogIn(userInfo, context);
        }

        registerPartials(context)
            .then(function () {
                this.partial('../templates/home/home.hbs') // Load template
            });
    });

    this.get('/login', function (context) {
        registerPartials(context, {
            'loginForm': '../templates/login/loginForm.hbs'
        })
            .then(function () {
                this.partial('../templates/login/loginPage.hbs');
            });
    });

    this.get('/register', function (context) {
        registerPartials(context, {
            'registerForm': '../templates/register/registerForm.hbs'
        })
            .then(function () {
                this.partial('../templates/register/registerPage.hbs')
            });
    });

    this.get('/logout', function (context) {

        signOut(auth)
            .then(() => {
                localStorage.removeItem('userInfo');
                context.loggedIn = false;
                context.redirect('/home');
            })
            .catch(error => {
                showErrorMessage(error.message);
            });

    });

    this.get('/about', function (context) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserLogIn(userInfo, context);
        }
        
        registerPartials(context)
            .then(function () {
                this.partial('../templates/about/about.hbs')
            });
    });


    // POST requests

    this.post('/register', function (context) { // Sammy waits for post request on this route - form action attribute on register form
        let { email, password, repeatPassword } = context.params; // Sammy gets them after form submit from the html form 'name' attributes and sets their value to the params object

        if (password !== repeatPassword) {
            showErrorMessage('Passwords should match!');
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                console.log(user);
                this.redirect('/login');
            })
            .catch(error => {
                showErrorMessage(error.message.substring(error.lastIndexOf(':') + 1));
            });
    });

    this.post('/login', function (context) {
        let { email, password } = context.params; // Sammy gets them after form submit from the html form 'name' attributes and sets their value to the params object

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user: { email, uid } }) => {
                console.log(email, uid);
                localStorage.setItem('userInfo', JSON.stringify({ uid, email }));
                this.redirect('/home');
            })
            .catch(error => {
                showErrorMessage(error.message.substring(error.lastIndexOf(':') + 1));
            });
    });
});

// Load initial route on app start
(() => {
    router.run('/home');
})();

// Helper functions 

function registerPartials(context, extraPartials = {}) {
    const commonPartials = { // Register the partials used in the then template
        'header': '../templates/common/header.hbs', // key name must be the same as the partial name
        'footer': '../templates/common/footer.hbs'
    };

    let allPartials = Object.assign({}, commonPartials, extraPartials);
    return context.loadPartials(allPartials);
}

function showErrorMessage(message) {
    // Show error message
    let errorBox = document.getElementById('errorBox');
    errorBox.textContent = message;
    errorBox.style.display = 'block';

    // Clear error box
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
    return;
}

function setUserLogIn(userInfo, context) {
        let { uid, email } = JSON.parse(userInfo);
        context.loggedIn = true;
        context.email = email;
}