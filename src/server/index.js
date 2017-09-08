const express = require('express');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongodb-session');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');
const auth = require('./auth');
const error = require('./middleware/error');

mongoose.Promise = global.Promise; // use es6 promises in mongoose queries
mongoose.connect(config.db.URL, {
  useMongoClient: true,
});

let app = express();

app.set('view engine', 'ejs'); // set rendering engine

// session storage
app.use(cookieParser(config.session.SECRET));
app.use(session({
  store: new (connectMongo(session))({
    uri: config.db.URL,
  }),
  secret: config.session.SECRET,
  resave: false,
  saveUninitialized: true,
}));

// enable POST parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

auth(app); // pass app to auth, which sets up passport
routes(app); // and to routes
error(app); // and to error handling

app.listen(config.server.PORT, () => {
  console.log(`Server started on port ${config.server.PORT}`); // eslint-disable-line no-console
});
