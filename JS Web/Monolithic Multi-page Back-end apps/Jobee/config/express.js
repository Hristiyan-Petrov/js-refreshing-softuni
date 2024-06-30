const express = require('express');
const { engine } = require('express-handlebars');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const saveLastRoute = require('../middlewares/saveLastRoute');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { SECRET, onMongoSanitize } = require('../config');

module.exports = app => {

  const hbs = engine({
    extname: '.hbs',
    helpers: {
      either: function (value, defaultValue) {
        return value || defaultValue;
      }
    }
  });

  app.engine('.hbs', hbs);
  app.set('view engine', 'hbs');
  app.set('views', './views');

  app.use('/static', express.static('static'));

  app.use(express.urlencoded({ extended: true }));    // Parse form bodies from client

  app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(onMongoSanitize(key, req));
      },
    }),
  );

  app.use(cookieParser());

  app.use(session({
    secret: SECRET, // replace 'your-secret' with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true for HTTPS
  }));

  app.use(flash());

  app.use(saveLastRoute);

  app.use(isAuthenticated);
}