import {
    // Authentication
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    // Firestore
    db,
    addDoc,
    collection,
    getDocs

} from "./firebase-config.js"

const dbRef = collection(db, 'offers');

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home

    this.get('/home', function (context) { // Get Sammy functions is used to render views; Post and others not 

        getDocs(dbRef)
            .then(res => {
                
                // getDocs() method from Firebase's Firestore returns a QuerySnapshot object that contains zero or more QueryDocumentSnapshot objects. 
                // Each of these objects represents a document in the Firestore database.
                // Attach shoes array to context, use it in the template 
                context.offers = res.docs.map(offer => ({id: offer.id, ...offer.data()}));

                // Rendering
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs'); // Sammy out of the box function for loading views, templates
                    });
            })
            .catch(err => {
                console.log(err);
            });
    });

    // User routes

    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs');
            });
    });

    this.post('/register', function (context) {
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

    });

    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
            });
    });

    this.post('/login', function (context) {
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
    });

    this.get('logout', function (context) {
        signOut(auth)
            .then(res => {
                clearUserData();
                console.log('logged out');
                this.redirect('/home');
            })
    });

    // Offers routes

    this.get('/create-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createOffer.hbs');
            });

    });

    this.post('/create-offer', function (context) {
        let { productName, price, brand, description, imageUrl } = context.params;

        addDoc(dbRef, {
            productName,
            price,
            imageUrl,
            description,
            brand,
            creatorId: getUserData().uid
        })
            .then(res => {
                console.log(res);
                this.redirect('/home');
            })
            .catch(err => {
                console.log(err);
            })
    });

    this.get('/edit-offer', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/editOffer.hbs');
            });

    });

    this.get('/details/:id', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/details.hbs');
            });

    });
});

(() => {
    app.run('/home'); // On initial app load, load this route
})();


// Function for loading partials
function extendContext(context) {

    let user = getUserData();
    // Check if logged user
    context.isLoggedIn = Boolean(user);
    context.email = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    });
}

// Helper functions

function saveUser(data) {
    let { user: { email, uid } } = data;
    localStorage.setItem('userData', JSON.stringify({ email, uid }));
}

function getUserData() {
    let user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    localStorage.removeItem('userData');
}