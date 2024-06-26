const express = require('express');
// const handlebars = require('express-handlebars');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const isAuthenticated = require('../middlewares/isAuthenticated');
const flash = require('connect-flash');

module.exports = app => {

    const hbs = engine({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs);
    app.set('view engine', 'hbs');
    app.set('views', './views');

    app.use('/static', express.static('static'));

    app.use(express.urlencoded({ extended: true }));    // Parse form bodies from client

    app.use(cookieParser());

    app.use(session({
        secret: 'your-secret', // replace 'your-secret' with your own secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // secure: true for HTTPS
    }));

    app.use(flash());

    app.use(isAuthenticated);
}