const express = require('express');

const routes = require('./routes');

// allow for both local and openshift environments
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

const app = express();

routes(app); // pass app to routes

app.listen(SERVER_PORT, SERVER_IP);
