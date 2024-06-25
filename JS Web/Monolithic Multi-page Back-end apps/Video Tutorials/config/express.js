const express = require('express');
// const handlebars = require('express-handlebars');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = app => {

    const hbs = engine({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs);
    app.set('view engine', 'hbs');
    app.set('views', './views');;

    app.use('/static', express.static('static'));

    app.use(express.urlencoded({ extended: true }));    // Parse form bodies from client

    app.use(cookieParser());
}