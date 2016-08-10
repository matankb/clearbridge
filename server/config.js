module.exports = {
  google: {
    clientID: '912811149086-rhb4j88j3p0ns5tp4ijs2g2kql81cfu4.apps.googleusercontent.com',
    clientSecret: 'EiYNNkSRbpcne6EImk3AgD27',
    callbackURL: process.env.NODE_ENV ?
                'https://bridge-jcdsboston.rhcloud.com/auth/callback/' :
                'http://127.0.0.1:8080/auth/callback',
  },
  // allow for both local and openshift envs
  db: {
    url: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1/bridge',
  },
  SERVER_PORT: process.env.NODE_PORT || 8080,
  SERVER_IP: process.env.NODE_IP || '127.0.0.1',
};
