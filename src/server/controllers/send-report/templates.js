module.exports = {
  0: data => data.comment,
  1: (data, navigator) => `${data.comment} <br /><br /><b>Data:</b> ${JSON.stringify(navigator)}`,
};
