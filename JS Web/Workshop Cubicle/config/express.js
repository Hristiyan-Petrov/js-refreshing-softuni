import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

export default (app) => {

    // Set up the view engine

    app.engine('.hbs', engine({
        extname: '.hbs'
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

    // Set up body parser

    app.use(bodyParser.urlencoded({ extended: false }));

    // Set up the statuc files
    // Assuming the static files are in a 'public' folder
    app.use(express.static('public'));

}