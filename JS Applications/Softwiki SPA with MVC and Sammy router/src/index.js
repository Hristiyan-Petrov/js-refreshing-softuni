const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs'); // Say to Sammy to use Handlebars for template engine; and .hbs for file extension

    // Home
    this.get('/home', homePage);

    // Attach user data to 'App context'. 
    // Better practice than attaching to event context (previous logic in extendContext)
    // Available on all controllers
    // let user = getUserData(this);
    // this.userData = {
    //     isLoggedIn: Boolean(user),
    //     user
    // }
});

app.run(); // Initial app load

// (() => {
// app.run('/home'); // On initial app load, load this route
// })();