import express from 'express';
import { engine } from 'express-handlebars';

import session from 'express-session';

export default (app) => {

    // Set up the view engine
    app.engine('.hbs', engine({
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', './views');

    // Set up body parser
    app.use(express.urlencoded({ extended: true }));

    // Set up the static files
    app.use(express.static('static'));  // Assuming the static files are in a 'static' folder

    // Set up express session
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true
    }));
}