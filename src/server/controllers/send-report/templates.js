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
};
