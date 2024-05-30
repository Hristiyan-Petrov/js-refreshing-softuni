// This file exports all future handlers
const homeHandler = require('./home');
const staticFiles = require('./static-files');

module.exports = [homeHandler, staticFiles];