export default (app) => {

    app.get('/', (req, res) => {
        res.status(200);
        res.render('index');    // Express-handlebars out of the box searches for file with that name in folder dir/views
    });

    app.get('/about', (req, res) => {
        res.status(200);
        res.render('about');
    });

    app.get('/create', (req, res) => {
        res.status(200);
        res.render('create');
    });

    app.get('/details/:id', (req, res) => {
        console.log(req.params.id);
        res.status(200);
        res.render('details');
    });

    // Middleware for handling 404 - Not Found
    app.use((req, res, next) => {
        res.status(404).render('404');
    });
}