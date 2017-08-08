const config = require('../../config');

function escapeHtml(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

module.exports = {
  // general comment
  0: (data, navigator, user) => ({
    subject: 'Bridge Report [Comment]',
    html: `${escapeHtml(data.comment)}
        <br /><b>User ID:</b> ${user.id}`,
  }),
  // bug report
  1: (data, navigator, user) => ({
    subject: 'Bridge Report [Bug]',
    html: `${escapeHtml(data.comment)}
        <br /><b>User ID:</b> ${user.id}
        <br /><b>Browser Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // error report (auto-generated)
  2: (data, navigator, user) => ({
    subject: 'Bridge Report [Error]',
    html: `There was a client-side error: ${escapeHtml(data.error)}
           <br /><b>User ID:</b> ${user.id}
           <br /><b>Browser Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // topic suggestion
  3: (data, navigator, user) => ({
    subject: 'Bridge Report [Topic Suggestion]',
    to: config.feedback.suggestEmail,
    html: `<b>${user.name}</b> suggested: <br /><br />${escapeHtml(data.comment)}`,
  }),
};
