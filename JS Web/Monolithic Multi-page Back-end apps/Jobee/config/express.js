const express = require('express');
const { engine } = require('express-handlebars');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const saveLastRoute = require('../middlewares/saveLastRoute');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = app => {

  const hbs = engine({
    extname: '.hbs'
  });

  app.engine('.hbs', hbs);
  app.set('view engine', 'hbs');
  app.set('views', './views');

  app.use('/static', express.static('static'));

  app.use(express.urlencoded({ extended: true }));    // Parse form bodies from client

  app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    }),
  );

  app.use(cookieParser());

  app.use(session({
    secret: 'your-secret', // replace 'your-secret' with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true for HTTPS
  }));

  app.use(flash());

  app.use(saveLastRoute);

  app.use(isAuthenticated);
}