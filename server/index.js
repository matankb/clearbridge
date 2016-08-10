const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const auth = require('./auth');

mongoose.Promise = global.Promise; // use es6 promises in mongoose queries
mongoose.connect(config.db.url);

let app = express();

app.use(session({ secret: 'Reflectbridge1' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

auth(app); // pass app to auth, which sets up passport
routes(app); // and to routes

app.listen(SERVER_PORT, SERVER_IP);
