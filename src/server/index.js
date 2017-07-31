const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const auth = require('./auth');

mongoose.Promise = global.Promise; // use es6 promises in mongoose queries
mongoose.connect(config.db.URL, {
  useMongoClient: true,
});

let app = express();

// enable POST parsing and session storage
app.use(session({
  secret: config.session.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

auth(app); // pass app to auth, which sets up passport
routes(app); // and to routes

app.listen(config.server.PORT, config.server.IP, () => {
  console.log(`Server started on port ${config.server.PORT}`); // eslint-disable-line no-console
});
