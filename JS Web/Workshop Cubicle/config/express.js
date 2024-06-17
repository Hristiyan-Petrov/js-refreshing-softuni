import express from 'express';
import { engine } from 'express-handlebars';

import session from 'express-session';
import cookieParser from 'cookie-parser';

import auth from '../middlewares/auth.js';

export default (app) => {

    // Set up the view engine
    const hbs = engine({
        extname: '.hbs',
        helpers: {
            equals: (a, b) => a == b
        }
    })

    app.engine('.hbs', hbs);
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

    // Set up cookie parser
    app.use(cookieParser());

    // Set up auth middleware
    app.use(auth());
}