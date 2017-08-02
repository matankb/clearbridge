const config = require('../../config');

function escapeHtml(html) {
  return html.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
}

module.exports = {
  // general comment
  0: data => ({
    subject: 'Bridge Report [Comment]',
    html: escapeHtml(data.comment),
  }),
  // bug report
  1: (data, navigator) => ({
    subject: 'Bridge Report [Bug]',
    html: `${escapeHtml(data.comment)} <br /><br /><b>Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // error report (auto-generated)
  2: (data, navigator) => ({
    subject: 'Bridge Report [Error]',
    html: `There was a client-side error: ${escapeHtml(data.comment)}
           <br /><b>Browser Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // topic suggestion
  3: (data) => ({
    subject: 'Bridge Report [Topic Suggestion]',
    to: config.feedback.suggestEmail,
    html: escapeHtml(data.comment),
  }),
};
