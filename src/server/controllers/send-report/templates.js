module.exports = {
  // general comment
  0: data => ({
    subject: 'Bridge Report [Comment]',
    html: data.comment }
  ),
  // bug report
  1: (data, navigator) => ({
    subject: 'Bridge Report [Bug]',
    html: `${data.comment} <br /><br /><b>Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // error report (auto-generated)
  2: (data, navigator) => ({
    subject: 'Bridge Report [Error]',
    html: `There was a client-side error: ${data.error}
           <br /><b>Browser Data:</b> ${JSON.stringify(navigator)}`,
  }),
  // topic suggestion
  3: (data) => ({
    subject: 'Bridge Report [Topic Suggestion]',
    html: data.comment,
  }),
};
