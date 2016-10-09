const mailer = require('nodemailer');

const baseSubject = 'New Bridge Feedback: ';

const defaultOpts = {
  from: '"Bridge Feedback" <bridge@jcdsboston.org>',
  to: '205matan+bridgefeedback@gmail.com',
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

module.exports = function sendFeedback(req, res) {
  let opts = req.body.data;
  Object.assign(opts, defaultOpts);
  opts.subject = `${baseSubject}${opts.subject}`;
  sender.sendMail(opts, handleSent.bind(null, res));
};
