import {
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

    this.get('/catalog', function (context) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserLogIn(userInfo, context);
        }
        context.hasNoTeam = true;

        // DB
        let teamsRef = ref(db, 'teams/');
        get(teamsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Set teams to context with the key as '_id' property
                    context.teams = Object.entries(snapshot.val()).map(([teamId, teamData]) => {
                        return { _id: teamId, ...teamData }; // create a new object with _id and spread the teamData properties
                    });
                    console.log(context.teams);
                } else {
                    console.log("No data available");
                }

                registerPartials(context, {
                    'team': '../templates/catalog/team.hbs'
                })
                    .then(function () {
                        console.log(this);
                        this.partial("../templates/catalog/teamCatalog.hbs");
                    });
            })
            .catch(error => {
                console.log(error);
                showErrorMessage(error);
            });
    });

    this.get('catalog/:teamId', function (context) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserLogIn(userInfo, context);
        }

        // DB
        let teamId = context.params.teamId;
        let teamsRef = ref(db, `teams/${teamId}`);
        get(teamsRef)
            .then(snapshot => {
                let userId = getUID();
                let { name, comment, members } = snapshot.val();

                members.includes(userId) ? context.isOnTeam = true : context.isOnTeam = false;

                // Set context values
                context.name = name;
                context.comment = comment;
                context.teamId = teamId;

                // Render template
                registerPartials(context, {
                    'teamMember': '../templates/catalog/teamMember.hbs',
                    'teamControls': '../templates/catalog/teamControls.hbs',
                })
                    .then(function () {
                        this.partial('../templates/catalog/details.hbs') // Load template
                    });
            })
            .catch(err => {
                console.log(err);
                showErrorMessage(err);
            })

    });

    this.get('/join/:teamId', function (context) {
        let userId = getUID();
        let teamId = context.params.teamId;
        let teamRef = ref(db, `teams/${teamId}`);

        console.log(teamId);

        get(teamRef)
            .then(snapshot => {
                let teamData = snapshot.val();

                // Add current user to teams joined users property 
                console.log(teamData);
                console.log(teamData.members);
                teamData.members.push(userId);

                // Update members in Firebase
                update(ref(db, `teams/${teamId}`), {
                    members: teamData.members
                });

                return teamData.name;
            })
            .then(teamName => {
                showInfoMessage(`Succesfully joined team ${teamName}`);
                this.redirect('/catalog');
            })
            .catch(error => {
                console.log(error);
            });
    });

    this.get('/create', function (context) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUserLogIn(userInfo, context);
        }

        registerPartials(context, {
            'createForm': '../templates/create/createForm.hbs'
        })
            .then(function () {
                this.partial('../templates/create/createPage.hbs');
            })
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

    this.post('/create', function (context) {

        let { name, comment } = context.params;

        let teamsRef = ref(db, 'teams/');

        const newTeamRef = push(teamsRef);
        set(newTeamRef, {
            name,
            comment,
            creatorUID: getUID(),
            members: [getUID()]
        })
            .then(() => {
                showInfoMessage('Succesfully added new team!');
                this.redirect('/catalog');
            })
            .catch(error => {
                console.log(error);
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
        'footer': '../templates/common/footer.hbs',
        'header': '../templates/common/header.hbs', // key name must be the same as the partial name
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

function showInfoMessage(message) {
    // Show info message
    let infoBox = document.getElementById('infoBox');
    infoBox.textContent = message;
    infoBox.style.display = 'block';

    // Clear info box
    setTimeout(() => {
        infoBox.style.display = 'none';
    }, 3000);
    return;
}

function getUID() {
    return JSON.parse(localStorage.getItem('userInfo')).uid;
}

function setUserLogIn(userInfo, context) {
    let { uid, email } = JSON.parse(userInfo);
    context.loggedIn = true;
    context.email = email;
    context.uid = uid;
}