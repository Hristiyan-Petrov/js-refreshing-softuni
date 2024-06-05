export default (app) => {

    app.get('/', (req, res) => {
        res.status(200);
        res.render('index');    // Express-handlebars out of the box searches for file with that name in folder dir/views
    });
}