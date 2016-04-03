const production = !!process.env.OPENSHIFT_NODEJS_PORT; //test for prod environment

module.exports = {
  google: {
    clientID: '912811149086-rhb4j88j3p0ns5tp4ijs2g2kql81cfu4.apps.googleusercontent.com',
    clientSecret: 'EiYNNkSRbpcne6EImk3AgD27',
    callbackURL: production ? 'https://bridge-jcdsboston.rhcloud.com/callback' : 'http://127.0.0.1/auth/callback',
  },
  db: {
    url: production ? process.env.OPENSHIFT_MONGODB_DB_URL : 'mongodb://127.0.0.1/bridge',
  },
};
