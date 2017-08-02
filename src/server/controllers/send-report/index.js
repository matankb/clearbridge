const mailer = require('nodemailer');

const config = require('../../config');
const templates = require('./templates');

const defaultOpts = {
  from: '"Bridge" <bridge@jcdsboston.org>',
  to: config.feedback.primaryEmail,
  subject: 'Bridge Report',
  body: '',
};

const sender = mailer.createTransport('smtps://bridge%40jcdsboston.org:Reflectbridge1@smtp.gmail.com'); // eslint-disable-line max-len

function handleSent(res, error, info) {
  let gotErrors = error || info.rejected.length > 0;
  let errorMessage = 'Error sending message.';

  if (info.rejected.length > 0) {
    errorMessage = info.response;
  }

  if (gotErrors) {
    return res.status(500).json({ message: errorMessage });
  }

  res.status(200).end();
}

function getTemplateOptions({ type, data, navigator }) {
  return templates[type](data, navigator);
}

module.exports = function sendReport(req, res) {
  let templateOpts = getTemplateOptions(req.body);
  let opts = Object.assign({}, defaultOpts, templateOpts); // copy opts
  sender.sendMail(opts, handleSent.bind(null, res));
};
