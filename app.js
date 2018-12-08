var express = require('express');
var app = express();
var cors = require('cors')
var db = require('./db');

var UserController = require('./user/UserController');
var issue2options = {
    origin: true,
    methods: ['POST'],
    credentials: true,
    maxAge: 3600
  };
app.options('/users', cors(issue2options));

app.use('/users', UserController);
app.options('/session', cors(issue2options));

module.exports = app;
