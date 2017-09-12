const assign = require('deep-assign');

const isProduction = process.env.NODE_ENV === 'production';

const prod = {
  db: {
    URL: process.env.MONGODB_URI,
  },
  server: {
    PORT: process.env.PORT,
  },
  google: {
    CALLBACK_URL: 'http://www.clearbridge.io/auth/callback/',
  },
  feedback: {
    suggestEmail: 'gavie@jcdsboston.org',
  },
};

const dev = {
  db: {
    URL: 'mongodb://127.0.0.1/bridge',
  },
  server: {
    PORT: 8080,
    IP: '127.0.0.1',
  },
  google: {
    CALLBACK_URL: 'http://127.0.0.1:8080/auth/callback/',
  },
  feedback: {
    suggestEmail: '205matan+bridgetopicsuggest@gmail.com',
  },
};

// will be applied to both dev and prod
const general = {
  google: {
    CLIENT_ID: '912811149086-rhb4j88j3p0ns5tp4ijs2g2kql81cfu4.apps.googleusercontent.com',
    CLIENT_SECRET: 'EiYNNkSRbpcne6EImk3AgD27',
  },
  localAuth: {
    USERNAME_FIELD: 'email',
    PASSWORD_FIELD: 'password',
  },
  session: {
    SECRET: 'Reflectbridge1',
  },
  feedback: {
    primaryEmail: '205matan+bridgefeedback@gmail.com',
  },
};

// export different configuation object depending on env
module.exports = assign(general, isProduction ? prod : dev);
