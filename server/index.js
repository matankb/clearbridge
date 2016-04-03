const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const routes = require('./routes');
const auth = require('./auth');

// allow for both local and openshift environments
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

mongoose.connect(config.db.url);

const app = express();

auth(app); // pass app to auth, which sets up passport
routes(app); // and to routes

app.listen(SERVER_PORT, SERVER_IP);
